import { type Express, type Request, type Response, NextFunction } from "express";
import { storage } from "./storage";
import { randomBytes, createHash } from "crypto";
import rateLimit from "express-rate-limit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerObjectStorageRoutes, ObjectStorageService } from "./replit_integrations/object_storage";
import { zohoClient, zohoDeskService, zohoCRMService, zohoBillingService } from "./zoho";

const JWT_SECRET = process.env.JWT_SECRET || randomBytes(32).toString('hex');
const SALT_ROUNDS = 12;

// Utility function for generating IDs
const randomId = () => randomBytes(16).toString('hex');

// Types
interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// ========== MIDDLEWARE ==========

// JWT-based auth middleware with proper validation
export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Invalid authorization header" });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.user = { id: decoded.userId, email: decoded.email, role: decoded.role };
    req.userId = decoded.userId;
    next();
  } catch (e: any) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(401).json({ error: "Invalid token" });
  }
}

// Generate JWT token
function generateToken(userId: string, email: string, role: string = "user"): string {
  return jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '24h' });
}

// Hash password securely
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Rate limiters
const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many chat messages",
});

const leadQuoteRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many quote requests. Please try again later.",
});

// Input validation middleware
const validateInput = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Basic size check
  if (JSON.stringify(req.body).length > 1024 * 1024) {
    return res.status(413).json({ error: "Payload too large" });
  }
  next();
};

// Security event logger
const logSecurityEvent = (event: string, req: AuthenticatedRequest, data: any) => {
  console.log(`[SECURITY] ${event}`, { userId: req.user?.id, ...data });
};

// ========== ROUTES ==========

export async function registerRoutes(app: Express) {
  // Register object storage routes for file uploads
  registerObjectStorageRoutes(app);
  
  // ===== AUTHENTICATION ROUTES =====
  
  // Register new user with hashed password
  app.post("/api/auth/register", async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { username, email, password, fullName } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
      }
      
      if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }
      
      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(409).json({ error: "Username already taken" });
      }

      // Hash password before storing
      const hashedPassword = await hashPassword(password);
      
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        fullName: fullName || null,
      });

      // Generate JWT token
      const token = generateToken(user.id, user.email || "", "user");
      
      // Don't return password in response
      const { password: _, ...safeUser } = user;
      
      res.json({ success: true, user: safeUser, token });
      logSecurityEvent("USER_REGISTERED", req, { userId: user.id });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Login with password verification
  app.post("/api/auth/login", async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        logSecurityEvent("LOGIN_FAILED", req, { email });
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const token = generateToken(user.id, user.email || "", "user");
      
      // Don't return password in response
      const { password: _, ...safeUser } = user;
      
      res.json({ success: true, user: safeUser, token });
      logSecurityEvent("USER_LOGIN", req, { userId: user.id });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Get current user
  app.get("/api/auth/me", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId || "");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== WORKSPACE ROUTES =====
  app.get("/api/workspaces", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const workspaces = await storage.getWorkspacesByUserId(req.userId || "");
      res.json({ workspaces });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/workspaces", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const workspace = await storage.createWorkspace({
        name,
        description: description || "",
        ownerId: req.userId || "",
        icon: "📦",
        color: "#5034ff",
      });

      res.json({ workspace });
      logSecurityEvent("WORKSPACE_CREATED", req, { workspaceId: workspace.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/workspaces/:id", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const workspace = await storage.getWorkspace(req.params.id);
      if (!workspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }
      res.json({ workspace });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== PROJECT ROUTES =====
  app.get("/api/projects", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { workspaceId } = req.query;
      if (!workspaceId) {
        return res.status(400).json({ error: "workspaceId required" });
      }
      const projects = await storage.getProjectsByWorkspaceId(String(workspaceId));
      res.json({ projects });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/projects", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, workspaceId, description } = req.body;
      if (!name || !workspaceId) {
        return res.status(400).json({ error: "Name and workspaceId required" });
      }

      const project = await storage.createProject({
        workspaceId,
        name,
        createdBy: req.userId || "",
        description: description || "",
        color: "#5034ff",
        isFavorite: false,
      });

      res.json({ project });
      logSecurityEvent("PROJECT_CREATED", req, { projectId: project.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== BOARD ROUTES =====
  app.get("/api/boards", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { projectId } = req.query;
      if (!projectId) {
        return res.status(400).json({ error: "projectId required" });
      }
      const boards = await storage.getBoardsByProjectId(String(projectId));
      res.json({ boards });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/boards", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, projectId } = req.body;
      if (!name || !projectId) {
        return res.status(400).json({ error: "Name and projectId required" });
      }

      const board = await storage.createBoard({
        projectId,
        name,
        position: 0,
      });

      res.json({ board });
      logSecurityEvent("BOARD_CREATED", req, { boardId: board.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== TASK ROUTES =====
  app.get("/api/tasks", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { boardId, projectId } = req.query;
      let tasks: any[] = [];
      
      if (boardId) {
        tasks = await storage.getTasksByBoardId(String(boardId));
      } else if (projectId) {
        tasks = await storage.getTasksByProjectId(String(projectId));
      }
      
      res.json({ tasks });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tasks", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, boardId, projectId, description } = req.body;
      if (!title || !projectId) {
        return res.status(400).json({ error: "Title and projectId required" });
      }

      const task = await storage.createTask({
        projectId,
        boardId: boardId || null,
        title,
        description: description || null,
        status: "todo",
        priority: "medium",
        position: 0,
        isArchived: false,
        createdBy: req.userId || "",
      });

      res.json({ task });
      logSecurityEvent("TASK_CREATED", req, { taskId: task.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/tasks/:id", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, status, priority, description } = req.body;
      const task = await storage.updateTask(req.params.id, {
        title,
        status,
        priority,
        description,
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({ task });
      logSecurityEvent("TASK_UPDATED", req, { taskId: task.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/tasks/:id", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      await storage.deleteTask(req.params.id);
      res.json({ success: true });
      logSecurityEvent("TASK_DELETED", req, { taskId: req.params.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== LABEL ROUTES =====
  app.get("/api/labels", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { workspaceId } = req.query;
      if (!workspaceId) {
        return res.status(400).json({ error: "workspaceId required" });
      }
      const labels = await storage.getLabelsByWorkspaceId(String(workspaceId));
      res.json({ labels });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/labels", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, workspaceId, color } = req.body;
      if (!name || !workspaceId) {
        return res.status(400).json({ error: "Name and workspaceId required" });
      }

      const label = await storage.createLabel({
        workspaceId,
        name,
        color: color || "#5034ff",
      });

      res.json({ label });
      logSecurityEvent("LABEL_CREATED", req, { labelId: label.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== COMMENT ROUTES =====
  app.get("/api/comments", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { taskId } = req.query;
      if (!taskId) {
        return res.status(400).json({ error: "taskId required" });
      }
      const comments = await storage.getCommentsByTaskId(String(taskId));
      res.json({ comments });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/comments", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { content, taskId } = req.body;
      if (!content || !taskId) {
        return res.status(400).json({ error: "Content and taskId required" });
      }

      const comment = await storage.createComment({
        taskId,
        userId: req.userId || "",
        content,
      });

      res.json({ comment });
      logSecurityEvent("COMMENT_CREATED", req, { commentId: comment.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/comments/:id", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      await storage.deleteComment(req.params.id);
      res.json({ success: true });
      logSecurityEvent("COMMENT_DELETED", req, { commentId: req.params.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== CHAT ROUTES =====
  app.get("/api/chat", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { ticketId } = req.query;
      if (!ticketId) {
        return res.status(400).json({ error: "ticketId required" });
      }
      const messages = await storage.getChatMessagesByTicketId(String(ticketId));
      res.json({ messages });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/chat", [authMiddleware, chatRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { ticketId, content, isRead } = req.body;
      if (!ticketId || !content) {
        return res.status(400).json({ error: "ticketId and content required" });
      }

      const message = await storage.createChatMessage({
        ticketId,
        userId: req.userId || "",
        content,
        senderName: req.user?.fullName || "User",
        senderRole: "client",
        isRead: isRead || false,
      });

      res.json({ message });
      logSecurityEvent("CHAT_MESSAGE_SENT", req, { ticketId });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== PORTAL AI/INTEGRATION ROUTES =====
  app.get("/api/portal/jumpcloud/devices", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const mockDevices = [
        { id: "device-1", name: "DESKTOP-01", os: "Windows 10", status: "active" },
        { id: "device-2", name: "LAPTOP-01", os: "MacOS", status: "active" },
      ];
      res.json({ success: true, devices: mockDevices });
      logSecurityEvent("JUMPCLOUD_DEVICES_FETCHED", req, {});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/portal/tickets/classify", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: "Title and description required" });
      }
      
      const { classifyTicket } = await import("./openaiService");
      const classification = await classifyTicket(title, description);
      
      res.json({
        success: true,
        classification: {
          category: classification.category,
          priority: classification.priority,
          tags: classification.suggestedTags,
        },
      });
      logSecurityEvent("TICKET_CLASSIFIED", req, {});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/portal/chat/message", [authMiddleware, chatRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { message, conversationHistory = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message required" });
      }
      
      const { generateChatResponse } = await import("./openaiService");
      const aiResponse = await generateChatResponse(message, conversationHistory);
      
      res.json({
        success: true,
        message: {
          id: randomId(),
          content: aiResponse,
          respondedBy: "ai",
          timestamp: new Date().toISOString(),
        },
      });
      logSecurityEvent("CHAT_MESSAGE_SENT", req, {});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // In-memory chat message storage for persistence
  const chatMessages: Map<string, any[]> = new Map();

  // Live chat messages route (for PortalChat WebSocket fallback)
  app.post("/api/portal/chat/messages", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { content, ticketId, senderName, senderRole } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Message content required" });
      }
      
      const chatId = ticketId || `user-${req.userId}`;
      const message = {
        id: randomId(),
        ticketId: chatId,
        userId: req.userId,
        senderName: senderName || "User",
        senderRole: senderRole || "client",
        content,
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      
      // Store message in memory
      if (!chatMessages.has(chatId)) {
        chatMessages.set(chatId, []);
      }
      chatMessages.get(chatId)!.push(message);
      
      // Broadcast to WebSocket clients if available
      if ((global as any).wsBroadcast) {
        (global as any).wsBroadcast({ type: "chat_message", data: message });
      }
      
      res.json({ success: true, message });
      logSecurityEvent("LIVE_CHAT_MESSAGE", req, { ticketId: chatId });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get chat message history
  app.get("/api/portal/chat/messages", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const ticketId = req.query.ticketId as string || `user-${req.userId}`;
      const messages = chatMessages.get(ticketId) || [];
      
      res.json({ success: true, messages });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/portal/questionnaires/events", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const mockEvents = [
        { id: "1", type: "deployment", title: "Q4 Security Update", date: new Date(), status: "scheduled" },
      ];
      res.json({ success: true, events: mockEvents });
      logSecurityEvent("QUESTIONNAIRES_FETCHED", req, {});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== ADMIN OPENAI CONTROL =====
  app.get("/api/portal/admin/openai/status", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      res.json({
        success: true,
        enabled: process.env.ENABLE_OPENAI_INTEGRATION === "true",
        status: "configured",
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/portal/admin/openai/toggle", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const currentState = process.env.ENABLE_OPENAI_INTEGRATION === "true";
      res.json({
        success: true,
        enabled: !currentState,
        message: "OpenAI integration toggled",
      });
      logSecurityEvent("OPENAI_TOGGLED", req, { state: !currentState });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== PORTAL TICKET ROUTES =====
  // Get all tickets for user
  app.get("/api/portal/tickets", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const tickets = await storage.getPortalTickets(req.userId || "");
      res.json({
        tickets: tickets.map(t => ({
          id: t.id,
          ticketNumber: t.ticketNumber || `#TK${String(t.id).padStart(3, '0')}`,
          subject: t.subject,
          description: t.description,
          status: t.status,
          priority: t.priority,
          category: t.category || "General",
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
        })),
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create new ticket
  app.post("/api/portal/tickets", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { subject, description, priority, category } = req.body;
      
      if (!subject || !description) {
        return res.status(400).json({ error: "Subject and description are required" });
      }

      const ticket = await storage.createPortalTicket({
        userId: req.userId || "",
        createdBy: req.userId || "",
        subject,
        description,
        status: "open",
        priority: priority || "medium",
        category: category || "general",
      });

      res.json({ success: true, ticket });
      logSecurityEvent("TICKET_CREATED", req, { ticketId: ticket.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single ticket by ID
  app.get("/api/portal/tickets/:id", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const ticket = await storage.getPortalTicket(id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      
      const comments = await storage.getPortalTicketComments(id);
      
      res.json({
        ticket: {
          ...ticket,
          ticketNumber: ticket.ticketNumber || `#TK${String(ticket.id).padStart(3, '0')}`,
          comments: comments.map(c => ({
            id: c.id,
            author: c.userId === req.userId ? "You" : "Support",
            role: c.isInternal ? "Support Engineer" : "Client",
            content: c.content,
            timestamp: c.createdAt,
            isInternal: c.isInternal,
          })),
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/portal/tickets/:id/comments", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const ticket = await storage.getPortalTicket(id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      const comment = await storage.createPortalTicketComment({
        id: randomId(),
        ticketId: id,
        content,
        authorId: req.userId || "",
        authorName: req.user?.fullName || "Client",
        isInternal: false,
        createdAt: new Date(),
      });

      res.json({ success: true, comment });
      logSecurityEvent("TICKET_COMMENT_ADDED", req, { ticketId: id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== PORTAL AUTHENTICATION =====
  // In-memory user and client storage for demo (replace with database in production)
  const portalUsers: Map<string, any> = new Map();
  const portalClients: Map<string, any> = new Map();
  
  // Demo companies - Password: ClientDemo1!
  const demoCompanies = [
    { id: "client-1", companyName: "Acme Corp", contactEmail: "admin@acme.com", contactPhone: "(480) 555-1001", industry: "Manufacturing", primaryContact: "John Smith", status: "active", createdAt: new Date() },
    { id: "client-2", companyName: "Phoenix Medical Group", contactEmail: "it@phoenixmedical.com", contactPhone: "(480) 555-1002", industry: "Healthcare", primaryContact: "Sarah Jones", status: "active", createdAt: new Date() },
    { id: "client-3", companyName: "Desert Law Partners", contactEmail: "admin@desertlaw.com", contactPhone: "(480) 555-1003", industry: "Legal", primaryContact: "Mike Davis", status: "active", createdAt: new Date() },
    { id: "client-4", companyName: "Scottsdale Realty", contactEmail: "tech@scottsdalereal.com", contactPhone: "(480) 555-1004", industry: "Real Estate", primaryContact: "Lisa Wilson", status: "active", createdAt: new Date() },
  ];
  demoCompanies.forEach(c => portalClients.set(c.id, c));
  
  // Admin credentials - CHANGE THESE IN PRODUCTION
  // Password: Admin123! (bcrypt 12 rounds)
  const adminUser = {
    id: "admin-001",
    email: "admin@digeratiexperts.com",
    username: "admin",
    password: "$2b$12$Bf.sDD1gQ6391SrTebkd4.9BeiteKKOswHl63vyCN0/51CmDldT7K",
    role: "admin",
    fullName: "Administrator",
    clientId: null,
  };
  
  // Demo client users - Password: Admin123! (same as admin for demo)
  const demoUser1 = {
    id: "user-001",
    email: "john.smith@acme.com",
    username: "johnsmith",
    password: "$2b$12$Bf.sDD1gQ6391SrTebkd4.9BeiteKKOswHl63vyCN0/51CmDldT7K",
    role: "user",
    fullName: "John Smith",
    clientId: "client-1",
    isActive: true,
  };
  
  const demoUser2 = {
    id: "user-002",
    email: "sarah.jones@phoenixmedical.com",
    username: "sarahjones",
    password: "$2b$12$Bf.sDD1gQ6391SrTebkd4.9BeiteKKOswHl63vyCN0/51CmDldT7K",
    role: "user",
    fullName: "Sarah Jones",
    clientId: "client-2",
    isActive: true,
  };
  
  // Initialize with admin and demo users
  portalUsers.set(adminUser.email, adminUser);
  portalUsers.set(adminUser.username, adminUser);
  portalUsers.set(demoUser1.email, demoUser1);
  portalUsers.set(demoUser1.username, demoUser1);
  portalUsers.set(demoUser2.email, demoUser2);
  portalUsers.set(demoUser2.username, demoUser2);

  // Portal Register Endpoint
  app.post("/api/portal/register", [validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        return res.status(400).json({ message: "Email, username, and password are required" });
      }

      // Check if user already exists
      if (portalUsers.has(email) || portalUsers.has(username)) {
        return res.status(400).json({ message: "Email or username already exists" });
      }

      // Validate password strength
      if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({ 
          message: "Password must be at least 8 characters with 1 uppercase letter and 1 number" 
        });
      }

      // Hash password with bcrypt
      const bcrypt = await import('bcrypt');
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create new user
      const newUser = {
        id: randomId(),
        email,
        username,
        password: hashedPassword,
        role: "user",
        fullName: username,
        createdAt: new Date(),
      };

      portalUsers.set(email, newUser);
      portalUsers.set(username, newUser);

      logSecurityEvent("PORTAL_USER_REGISTERED", req, { userId: newUser.id, email });

      return res.json({
        success: true,
        message: "Account created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          fullName: newUser.fullName,
          role: newUser.role,
        },
      });
    } catch (error: any) {
      console.error("[ERROR] Portal registration failed:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Portal Login Endpoint
  app.post("/api/portal/login", [validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user
      const user = portalUsers.get(email);

      if (!user) {
        logSecurityEvent("PORTAL_LOGIN_FAILED", req, { email });
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare password using bcrypt
      const bcrypt = await import('bcrypt');
      const passwordValid = await bcrypt.compare(password, user.password);
      
      if (!passwordValid) {
        logSecurityEvent("PORTAL_LOGIN_FAILED", req, { email });
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token using the module-level JWT_SECRET
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      logSecurityEvent("PORTAL_USER_LOGIN", req, { userId: user.id, email, role: user.role });

      return res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
        },
      });
    } catch (error: any) {
      console.error("[ERROR] Portal login failed:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Portal Dashboard Stats
  app.get("/api/portal/dashboard", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const dashboardStats = {
        openTickets: 0,
        resolvedTickets: 0,
        activeServices: 0,
        pendingInvoices: 0,
        recentTickets: [],
        services: [],
      };
      
      res.json(dashboardStats);
    } catch (error: any) {
      console.error("[ERROR] Dashboard fetch failed:", error);
      res.status(500).json({ message: "Failed to load dashboard" });
    }
  });

  // Portal Knowledge Base Articles
  app.get("/api/portal/kb", [authMiddleware], async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const articles = [
        {
          id: "kb-001",
          title: "Getting Started with VPN Access",
          category: "VPN",
          content: "Learn how to configure and connect to our VPN for secure remote access.",
          excerpt: "Complete guide to setting up VPN access for remote work.",
          readTime: "5 min",
          updatedAt: "2025-01-15",
        },
        {
          id: "kb-002", 
          title: "Cytracom ControlOne Setup Guide",
          category: "Phone System",
          content: "Step-by-step instructions for configuring Cytracom ControlOne softphone.",
          excerpt: "Set up your cloud phone system with Cytracom ControlOne.",
          readTime: "8 min",
          updatedAt: "2025-01-10",
        },
        {
          id: "kb-003",
          title: "Password Reset Procedures",
          category: "Security",
          content: "How to reset your password for various company systems.",
          excerpt: "Self-service password reset instructions for all platforms.",
          readTime: "3 min",
          updatedAt: "2025-01-12",
        },
        {
          id: "kb-004",
          title: "Microsoft 365 Email Configuration",
          category: "Email",
          content: "Configure Microsoft 365 email on desktop and mobile devices.",
          excerpt: "Email setup guide for Outlook, mobile apps, and web access.",
          readTime: "6 min",
          updatedAt: "2025-01-08",
        },
        {
          id: "kb-005",
          title: "Multi-Factor Authentication (MFA) Setup",
          category: "Security",
          content: "Enable and configure MFA for enhanced account security.",
          excerpt: "Protect your accounts with two-factor authentication.",
          readTime: "4 min",
          updatedAt: "2025-01-14",
        },
        {
          id: "kb-006",
          title: "Remote Desktop Connection Guide",
          category: "Remote Access",
          content: "Connect to office computers remotely using RDP.",
          excerpt: "Access your work desktop from anywhere securely.",
          readTime: "5 min",
          updatedAt: "2025-01-11",
        },
      ];
      
      res.json(articles);
    } catch (error: any) {
      console.error("[ERROR] KB fetch failed:", error);
      res.status(500).json({ message: "Failed to load knowledge base" });
    }
  });

  // Portal Services List
  app.get("/api/portal/services", [authMiddleware], async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const services = [
        { id: "svc-001", serviceName: "Managed IT Support", status: "active", userCount: 25 },
        { id: "svc-002", serviceName: "Cloud Backup", status: "active", userCount: 25 },
        { id: "svc-003", serviceName: "Security Monitoring", status: "active", userCount: 25 },
      ];
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to load services" });
    }
  });

  // Portal Invoices List
  app.get("/api/portal/invoices", [authMiddleware], async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const invoices = [
        { id: "inv-001", invoiceNumber: "INV-2025-001", amount: 2499.00, status: "paid", dueDate: "2025-01-15", paidDate: "2025-01-10" },
        { id: "inv-002", invoiceNumber: "INV-2025-002", amount: 2499.00, status: "pending", dueDate: "2025-02-15", paidDate: null },
      ];
      res.json(invoices);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to load invoices" });
    }
  });

  // ===== ADMIN TENANT MANAGEMENT =====
  
  // List all companies (admin only)
  app.get("/api/portal/admin/companies", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const companies = Array.from(portalClients.values()).map(client => ({
        id: client.id,
        companyName: client.companyName,
        contactEmail: client.contactEmail,
        status: client.status || "active",
        userCount: Array.from(portalUsers.values()).filter(u => u.clientId === client.id).length,
        createdAt: client.createdAt,
      }));
      
      res.json({ companies });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get company details with users (admin only)
  app.get("/api/portal/admin/companies/:id", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const company = portalClients.get(req.params.id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      const users = Array.from(portalUsers.values())
        .filter(u => u.clientId === req.params.id)
        .map(u => ({
          id: u.id,
          email: u.email,
          fullName: u.fullName,
          role: u.role,
          isActive: u.isActive,
        }));
      
      res.json({ company, users });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create new company (admin only)
  app.post("/api/portal/admin/companies", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const { companyName, contactEmail, contactPhone, industry, primaryContact } = req.body;
      
      if (!companyName || !contactEmail) {
        return res.status(400).json({ error: "Company name and contact email are required" });
      }
      
      const newCompany = {
        id: randomId(),
        companyName,
        contactEmail,
        contactPhone: contactPhone || null,
        industry: industry || null,
        primaryContact: primaryContact || null,
        status: "active",
        createdAt: new Date(),
      };
      
      portalClients.set(newCompany.id, newCompany);
      
      res.json({ success: true, company: newCompany });
      logSecurityEvent("COMPANY_CREATED", req, { companyId: newCompany.id, companyName });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update company (admin only)
  app.put("/api/portal/admin/companies/:id", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const company = portalClients.get(req.params.id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      const { companyName, contactEmail, contactPhone, industry, primaryContact, status } = req.body;
      
      const updatedCompany = {
        ...company,
        companyName: companyName || company.companyName,
        contactEmail: contactEmail || company.contactEmail,
        contactPhone: contactPhone !== undefined ? contactPhone : company.contactPhone,
        industry: industry !== undefined ? industry : company.industry,
        primaryContact: primaryContact !== undefined ? primaryContact : company.primaryContact,
        status: status || company.status,
      };
      
      portalClients.set(req.params.id, updatedCompany);
      
      res.json({ success: true, company: updatedCompany });
      logSecurityEvent("COMPANY_UPDATED", req, { companyId: req.params.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin impersonation - switch to view a company's portal
  app.post("/api/portal/admin/impersonate", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const { companyId } = req.body;
      
      if (!companyId) {
        return res.status(400).json({ error: "Company ID required" });
      }
      
      const company = portalClients.get(companyId);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      // Generate a special token that includes the impersonated company ID
      const impersonationToken = jwt.sign(
        { 
          userId: req.userId, 
          email: req.user?.email, 
          role: "admin",
          impersonatingCompanyId: companyId,
          impersonatingCompanyName: company.companyName,
        }, 
        JWT_SECRET, 
        { expiresIn: '4h' }
      );
      
      res.json({ 
        success: true, 
        token: impersonationToken,
        company: {
          id: company.id,
          companyName: company.companyName,
        }
      });
      logSecurityEvent("ADMIN_IMPERSONATION_START", req, { companyId, companyName: company.companyName });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Stop impersonation - return to admin view
  app.post("/api/portal/admin/stop-impersonation", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      // Generate a regular admin token without impersonation
      const adminToken = jwt.sign(
        { 
          userId: req.userId, 
          email: req.user?.email, 
          role: "admin",
        }, 
        JWT_SECRET, 
        { expiresIn: '24h' }
      );
      
      res.json({ success: true, token: adminToken });
      logSecurityEvent("ADMIN_IMPERSONATION_STOP", req, {});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get tenant-specific files for a company (admin only)
  app.get("/api/portal/admin/companies/:id/files", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const company = portalClients.get(req.params.id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      // Get tenant files from storage - scoped to this company
      const tenantFiles = await storage.getTenantFilesByClientId(req.params.id);
      
      res.json({ files: tenantFiles });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get files for current user's company (regular users)
  app.get("/api/portal/my-files", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = portalUsers.get(req.user?.email || "");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const company = portalClients.get(user.clientId);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      // Get tenant files from storage
      const tenantFiles = await storage.getTenantFilesByClientId(user.clientId);
      
      res.json({ files: tenantFiles, companyName: company.companyName });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Upload file for a tenant (admin only)
  app.post("/api/portal/admin/companies/:id/files", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const company = portalClients.get(req.params.id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      const { fileName, fileType, category, description, objectPath } = req.body;
      
      if (!fileName || !objectPath) {
        return res.status(400).json({ error: "fileName and objectPath are required" });
      }
      
      const tenantFile = await storage.createTenantFile({
        clientId: req.params.id,
        fileName,
        fileType: fileType || "document",
        category: category || "general",
        description: description || "",
        fileUrl: objectPath,
        uploadedBy: req.userId || "",
      });
      
      res.json({ success: true, file: tenantFile });
      logSecurityEvent("TENANT_FILE_UPLOADED", req, { companyId: req.params.id, fileName });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete tenant file (admin only)
  app.delete("/api/portal/admin/companies/:companyId/files/:fileId", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const deleted = await storage.deleteTenantFile(req.params.fileId);
      if (!deleted) {
        return res.status(404).json({ error: "File not found" });
      }
      
      res.json({ success: true });
      logSecurityEvent("TENANT_FILE_DELETED", req, { companyId: req.params.companyId, fileId: req.params.fileId });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get company metrics/stats (admin only)
  app.get("/api/portal/admin/companies/:id/metrics", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const companyId = req.params.id;
      const company = portalClients.get(companyId);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      // Calculate metrics from portal data - get tickets from storage
      const allStoredTickets = await storage.getPortalTickets();
      const allTickets = allStoredTickets.filter((t: any) => t.clientId === companyId);
      const openTickets = allTickets.filter((t: any) => t.status === "open").length;
      const resolvedTickets = allTickets.filter((t: any) => t.status === "resolved").length;
      const inProgressTickets = allTickets.filter((t: any) => t.status === "in_progress").length;
      
      const users = Array.from(portalUsers.values()).filter(u => u.clientId === companyId);
      const tenantFiles = await storage.getTenantFilesByClientId(companyId);
      
      // Mock service and invoice data
      const metrics = {
        company: {
          id: company.id,
          name: company.companyName,
          status: company.status,
          createdAt: company.createdAt,
        },
        tickets: {
          total: allTickets.length,
          open: openTickets,
          inProgress: inProgressTickets,
          resolved: resolvedTickets,
          avgResolutionTime: "4.2 hours",
        },
        users: {
          total: users.length,
          activeUsers: users.filter(u => u.isActive).length,
          admins: users.filter(u => u.role === "admin").length,
        },
        files: {
          total: tenantFiles.length,
          agents: tenantFiles.filter(f => f.category === "agents").length,
          documents: tenantFiles.filter(f => f.category === "documents").length,
        },
        services: {
          activeServices: 3,
          monthlyValue: "$1,250.00",
          tier: "Business",
        },
        billing: {
          pendingInvoices: 1,
          totalOwed: "$450.00",
          lastPayment: "2024-12-15",
        },
        activity: {
          lastLogin: new Date().toISOString(),
          ticketsThisMonth: allTickets.filter((t: any) => {
            const ticketDate = new Date(t.createdAt);
            const now = new Date();
            return ticketDate.getMonth() === now.getMonth() && ticketDate.getFullYear() === now.getFullYear();
          }).length,
          filesUploadedThisMonth: tenantFiles.filter(f => {
            const fileDate = new Date(f.createdAt);
            const now = new Date();
            return fileDate.getMonth() === now.getMonth() && fileDate.getFullYear() === now.getFullYear();
          }).length,
        },
      };
      
      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== LEAD QUOTE FORM =====
  app.post("/api/lead-quote", [leadQuoteRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { seats, enterpriseToggle, connectivity, devices, recommendedPlan, firstName, lastName, company, email, consent, source, pageUrl, timestamp } = req.body;
      
      // Corporate email validation
      const domain = email.split('@')[1]?.toLowerCase();
      const blockedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'msn.com', 'live.com'];
      if (blockedDomains.includes(domain)) {
        return res.status(400).json({ error: "Please use your company email address" });
      }

      // Basic spam prevention - honeypot check
      const honeypot = req.body.website_url;
      if (honeypot) {
        logSecurityEvent("SPAM_DETECTED_HONEYPOT", req, { email });
        return res.status(400).json({ error: "Invalid request" });
      }

      // Store lead
      const leadData = {
        id: randomId(),
        seats,
        enterpriseToggle,
        connectivity,
        devices,
        recommendedPlan,
        firstName,
        lastName,
        company,
        email,
        consent,
        source,
        pageUrl,
        timestamp,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        createdAt: new Date(),
      };

      // Log the lead capture
      console.log("[LEAD] Quote form submitted:", { email, company, recommendedPlan, timestamp });
      logSecurityEvent("LEAD_QUOTE_SUBMITTED", req, { email, company, recommendedPlan });

      // In production, this would:
      // 1. Store in database
      // 2. Send to CRM (Zoho)
      // 3. Trigger email automation
      // For now, we just confirm receipt
      res.json({
        success: true,
        leadId: leadData.id,
        message: "Quote request received successfully",
      });
    } catch (error: any) {
      console.error("[ERROR] Lead quote submission failed:", error);
      res.status(500).json({ error: "Failed to process quote request" });
    }
  });

  // ===== CONTACT FORM =====
  app.post("/api/contact", [leadQuoteRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, email, phone, company, service, message } = req.body;
      
      // Basic validation
      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Name, email, and phone are required" });
      }

      // Basic spam prevention - honeypot check
      const honeypot = req.body.website_url;
      if (honeypot) {
        logSecurityEvent("SPAM_DETECTED_HONEYPOT", req, { email });
        return res.status(400).json({ error: "Invalid request" });
      }

      // Store contact submission
      const contactData = {
        id: randomId(),
        name,
        email,
        phone,
        company: company || null,
        service: service || null,
        message: message || null,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        createdAt: new Date(),
      };

      // Log the contact form submission
      console.log("[CONTACT] Form submitted:", { name, email, company, service, timestamp: new Date().toISOString() });
      logSecurityEvent("CONTACT_FORM_SUBMITTED", req, { email, company, service });

      // Push lead to Zoho CRM
      let zohoLeadId = null;
      try {
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || name;
        
        const zohoLead = await zohoCRMService.createLead({
          First_Name: firstName,
          Last_Name: lastName,
          Email: email,
          Phone: phone,
          Company: company || 'Not Specified',
          Lead_Source: 'Website Contact Form',
          Description: message || '',
          Lead_Status: 'New',
        });
        zohoLeadId = zohoLead?.details?.id || zohoLead?.id;
        console.log("[ZOHO] Lead created:", zohoLeadId);
      } catch (zohoError: any) {
        console.error("[ZOHO] Failed to create lead (non-blocking):", zohoError.message);
        // Don't fail the request if Zoho fails - the form submission is still valid
      }

      res.json({
        success: true,
        contactId: contactData.id,
        zohoLeadId,
        message: "Message received successfully",
      });
    } catch (error: any) {
      console.error("[ERROR] Contact form submission failed:", error);
      res.status(500).json({ error: "Failed to process contact request" });
    }
  });

  // ===== NEWSLETTER SUBSCRIPTION =====
  app.post("/api/newsletter", [leadQuoteRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Please enter a valid email address" });
      }

      // Basic spam prevention - honeypot check
      const honeypot = req.body.website_url;
      if (honeypot) {
        logSecurityEvent("SPAM_DETECTED_HONEYPOT", req, { email });
        return res.status(400).json({ error: "Invalid request" });
      }

      // Store newsletter subscription
      const subscriptionData = {
        id: randomId(),
        email,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        subscribedAt: new Date(),
      };

      // Log the newsletter subscription
      console.log("[NEWSLETTER] Subscription:", { email, timestamp: new Date().toISOString() });
      logSecurityEvent("NEWSLETTER_SUBSCRIBED", req, { email });

      // Push to Zoho CRM as a lead with newsletter source
      let zohoLeadId = null;
      try {
        // Check if lead already exists
        const existingLead = await zohoCRMService.getLeadByEmail(email);
        if (!existingLead) {
          const zohoLead = await zohoCRMService.createLead({
            Last_Name: email.split('@')[0], // Use email prefix as name
            Email: email,
            Lead_Source: 'Newsletter Signup',
            Lead_Status: 'New',
            Description: 'Subscribed to newsletter',
          });
          zohoLeadId = zohoLead?.details?.id || zohoLead?.id;
          console.log("[ZOHO] Newsletter lead created:", zohoLeadId);
        } else {
          console.log("[ZOHO] Lead already exists for:", email);
        }
      } catch (zohoError: any) {
        console.error("[ZOHO] Failed to create newsletter lead (non-blocking):", zohoError.message);
        // Don't fail the request if Zoho fails
      }

      res.json({
        success: true,
        subscriptionId: subscriptionData.id,
        zohoLeadId,
        message: "Successfully subscribed to newsletter",
      });
    } catch (error: any) {
      console.error("[ERROR] Newsletter subscription failed:", error);
      res.status(500).json({ error: "Failed to process subscription" });
    }
  });

  // ========== ZOHO API ROUTES ==========

  // Check Zoho connection status
  app.get("/api/zoho/status", async (req: Request, res: Response) => {
    try {
      const isConfigured = zohoClient.isConfigured();
      if (!isConfigured) {
        return res.json({ connected: false, message: "Zoho API not configured" });
      }
      
      await zohoClient.getAccessToken();
      res.json({ connected: true, message: "Zoho API connected" });
    } catch (error: any) {
      res.json({ connected: false, message: error.message });
    }
  });

  // ========== ZOHO DESK ROUTES ==========

  // Get all tickets (admin)
  app.get("/api/zoho/desk/tickets", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const { status, limit, from } = req.query;
      const result = await zohoDeskService.getTickets({
        status: status as string,
        limit: limit ? parseInt(limit as string) : undefined,
        from: from ? parseInt(from as string) : undefined,
      });
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get ticket by ID
  app.get("/api/zoho/desk/tickets/:id", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const ticket = await zohoDeskService.getTicketById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create ticket
  app.post("/api/zoho/desk/tickets", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { subject, description, priority } = req.body;
      
      if (!subject || !description) {
        return res.status(400).json({ error: "Subject and description required" });
      }
      
      const ticket = await zohoDeskService.createTicket({
        subject,
        description,
        email: req.user?.email,
        priority: priority || "Medium",
      });
      
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get my tickets (for logged in user)
  app.get("/api/zoho/desk/my-tickets", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const contact = await zohoDeskService.getContactByEmail(req.user?.email);
      if (!contact) {
        return res.json({ tickets: [], count: 0 });
      }
      
      const tickets = await zohoDeskService.getTicketsByContact(contact.id);
      res.json({ tickets, count: tickets.length });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get Desk departments
  app.get("/api/zoho/desk/departments", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const departments = await zohoDeskService.getDepartments();
      res.json({ departments });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ========== ZOHO CRM ROUTES ==========

  // Get CRM accounts (companies)
  app.get("/api/zoho/crm/accounts", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const { page, per_page } = req.query;
      const result = await zohoCRMService.getAccounts({
        page: page ? parseInt(page as string) : undefined,
        per_page: per_page ? parseInt(per_page as string) : undefined,
      });
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get CRM account by ID
  app.get("/api/zoho/crm/accounts/:id", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const account = await zohoCRMService.getAccountById(req.params.id);
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.json(account);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get CRM contacts
  app.get("/api/zoho/crm/contacts", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const { page, per_page } = req.query;
      const result = await zohoCRMService.getContacts({
        page: page ? parseInt(page as string) : undefined,
        per_page: per_page ? parseInt(per_page as string) : undefined,
      });
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get CRM deals
  app.get("/api/zoho/crm/deals", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const { page, per_page } = req.query;
      const result = await zohoCRMService.getDeals({
        page: page ? parseInt(page as string) : undefined,
        per_page: per_page ? parseInt(per_page as string) : undefined,
      });
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ========== ZOHO BILLING ROUTES ==========

  // Get subscriptions
  app.get("/api/zoho/billing/subscriptions", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const { status, page, per_page } = req.query;
      const result = await zohoBillingService.getSubscriptions({
        status: status as string,
        page: page ? parseInt(page as string) : undefined,
        per_page: per_page ? parseInt(per_page as string) : undefined,
      });
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get my subscription (for logged in user)
  app.get("/api/zoho/billing/my-subscription", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const customer = await zohoBillingService.getCustomerByEmail(req.user?.email);
      if (!customer) {
        return res.json({ subscriptions: [], customer: null });
      }
      
      const subscriptions = await zohoBillingService.getSubscriptionsByCustomer(customer.customer_id);
      res.json({ subscriptions, customer });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get invoices
  app.get("/api/zoho/billing/invoices", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const { status, page, per_page } = req.query;
      const result = await zohoBillingService.getInvoices({
        status: status as string,
        page: page ? parseInt(page as string) : undefined,
        per_page: per_page ? parseInt(per_page as string) : undefined,
      });
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get my invoices (for logged in user)
  app.get("/api/zoho/billing/my-invoices", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const customer = await zohoBillingService.getCustomerByEmail(req.user?.email);
      if (!customer) {
        return res.json({ invoices: [] });
      }
      
      const invoices = await zohoBillingService.getInvoicesByCustomer(customer.customer_id);
      res.json({ invoices });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get billing plans
  app.get("/api/zoho/billing/plans", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const plans = await zohoBillingService.getPlans();
      res.json({ plans });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return app;
}
