import { type Express, type Request, type Response, NextFunction } from "express";
import { storage } from "./storage";
import { randomBytes, createHash } from "crypto";
import rateLimit from "express-rate-limit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerObjectStorageRoutes, ObjectStorageService } from "./replit_integrations/object_storage";
import { zohoClient, zohoDeskService, zohoCRMService, zohoBillingService } from "./zoho";
import { verifyTurnstile } from "./middleware/security";
import { eventBus, EventTypes } from "./eventBus";
import { notificationService } from "./services/notificationService";
import { logger } from "./logger";

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
  storeRole?: string;
  clientId?: string | null;
  iat?: number;
  exp?: number;
}

// Session store for tracking active sessions with rotation (module-level for authMiddleware access)
export const sessionStore = new Map<string, { userId: string; createdAt: number; lastRotated: number }>();
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// ========== MIDDLEWARE ==========

// JWT-based auth middleware with proper validation and optional session validation
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
    req.user = { id: decoded.userId, email: decoded.email, role: decoded.role, storeRole: decoded.storeRole || 'public', clientId: decoded.clientId || null };
    req.userId = decoded.userId;
    
    // Optional session validation from cookies
    const sessionId = req.cookies?.sessionId;
    if (sessionId) {
      const session = sessionStore.get(sessionId);
      if (session) {
        // Validate session belongs to same user and hasn't expired
        const now = Date.now();
        if (session.userId === decoded.userId && (now - session.createdAt) < SESSION_EXPIRY_MS) {
          // Session is valid, attach session info
          (req as any).sessionId = sessionId;
          (req as any).sessionValid = true;
        } else {
          // Session expired or user mismatch - remove stale session but allow JWT auth to proceed
          sessionStore.delete(sessionId);
          (req as any).sessionValid = false;
        }
      } else {
        // Session ID present but not found in store - allow JWT auth to proceed
        (req as any).sessionValid = false;
      }
    }
    
    next();
  } catch (e: any) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(401).json({ error: "Invalid token" });
  }
}

// Store role types for RBAC
export type StoreRole = 'public' | 'prospect' | 'managed' | 'comanaged' | 'admin';

// Role-based access control middleware for store routes
export function requireRole(...allowedRoles: StoreRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const userStoreRole = req.user.storeRole || 'public';
    if (!allowedRoles.includes(userStoreRole as StoreRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Middleware that requires admin role for portal admin routes
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
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
  app.get("/api/portal/admin/openai/status", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
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

  app.post("/api/portal/admin/openai/toggle", [authMiddleware, requireAdmin, validateInput], async (req: AuthenticatedRequest, res: Response) => {
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

      // Create ticket in local storage
      const ticket = await storage.createPortalTicket({
        userId: req.userId || "",
        createdBy: req.userId || "",
        subject,
        description,
        status: "open",
        priority: priority || "medium",
        category: category || "general",
      });

      // Try to sync with Zoho Desk if configured
      try {
        const { zohoDeskService } = await import("./zoho/zohoDesk");
        const { zohoClient } = await import("./zoho/zohoClient");
        
        if (zohoClient.isConfigured()) {
          const user = req.user;
          const zohoTicket = await zohoDeskService.createTicket({
            subject,
            description,
            email: user?.email,
            priority: priority === "high" ? "High" : priority === "low" ? "Low" : "Medium",
          });
          console.log("✅ Ticket synced to Zoho Desk:", zohoTicket.id);
        }
      } catch (zohoError) {
        console.warn("Could not sync ticket to Zoho Desk:", zohoError);
        // Continue - local ticket was created successfully
      }

      res.status(201).json({ success: true, ticket });
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
  
  // Note: sessionStore is now at module level for authMiddleware access
  
  // Email verification tokens storage
  const emailVerificationTokens = new Map<string, { 
    email: string; 
    userId: string; 
    createdAt: number;
    expiresAt: number;
  }>();
  
  // MSP company (Digerati Experts) - separate from client companies
  const mspCompany = { 
    id: "msp-digerati", 
    companyName: "Digerati Experts (Internal)", 
    contactEmail: "admin@digeratiexperts.com", 
    contactPhone: "(480) 555-1000", 
    industry: "MSP/MSSP", 
    primaryContact: "Digerati Admin", 
    status: "active", 
    type: "msp", // MSP's own account
    createdAt: new Date() 
  };
  portalClients.set(mspCompany.id, mspCompany);
  
  // Demo client companies - Password: ClientDemo1!
  // serviceType: "managed" = full managed services, "comanaged" = co-managed IT
  const demoCompanies = [
    { id: "client-1", companyName: "Acme Corp", contactEmail: "admin@acme.com", contactPhone: "(480) 555-1001", industry: "Manufacturing", primaryContact: "John Smith", status: "active", type: "client", serviceType: "managed", createdAt: new Date() },
    { id: "client-2", companyName: "Phoenix Medical Group", contactEmail: "it@phoenixmedical.com", contactPhone: "(480) 555-1002", industry: "Healthcare", primaryContact: "Sarah Jones", status: "active", type: "client", serviceType: "managed", createdAt: new Date() },
    { id: "client-3", companyName: "Desert Law Partners", contactEmail: "admin@desertlaw.com", contactPhone: "(480) 555-1003", industry: "Legal", primaryContact: "Mike Davis", status: "active", type: "client", serviceType: "comanaged", createdAt: new Date() },
    { id: "client-4", companyName: "Scottsdale Realty", contactEmail: "tech@scottsdalereal.com", contactPhone: "(480) 555-1004", industry: "Real Estate", primaryContact: "Lisa Wilson", status: "active", type: "client", serviceType: "comanaged", createdAt: new Date() },
    { id: "client-5", companyName: "Alamo Industries", contactEmail: "support@alamoindustries.com", contactPhone: "(480) 555-1005", industry: "Manufacturing", primaryContact: "Maria Garcia", status: "active", type: "client", serviceType: "comanaged", createdAt: new Date() },
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
    storeRole: "admin" as StoreRole,
    fullName: "Administrator",
    clientId: null,
  };
  
  // Demo client users - Password: Admin123! (same as admin for demo)
  // storeRole is derived from client's serviceType: managed -> managed, comanaged -> comanaged
  const demoUser1 = {
    id: "user-001",
    email: "john.smith@acme.com",
    username: "johnsmith",
    password: "$2b$12$Bf.sDD1gQ6391SrTebkd4.9BeiteKKOswHl63vyCN0/51CmDldT7K",
    role: "user",
    storeRole: "managed" as StoreRole,
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
    storeRole: "managed" as StoreRole,
    fullName: "Sarah Jones",
    clientId: "client-2",
    isActive: true,
  };
  
  // Alamo Industries user - Password: AlamoUser123!
  // Alamo is a comanaged client (client-5), so they can purchase products
  const alamoUser = {
    id: "user-003",
    email: "admin@alamoindustries.com",
    username: "alamoadmin",
    password: "$2b$12$N9Ys4.kLCKht2rMjK4x0TOJHlQlxY7dRzAT6vmC7.mGrjck7TUI7O",
    role: "user",
    storeRole: "comanaged" as StoreRole,
    fullName: "Maria Garcia",
    clientId: "client-5",
    isActive: true,
  };
  
  // Initialize with admin and demo users
  portalUsers.set(adminUser.email, adminUser);
  portalUsers.set(adminUser.username, adminUser);
  portalUsers.set(demoUser1.email, demoUser1);
  portalUsers.set(demoUser1.username, demoUser1);
  portalUsers.set(demoUser2.email, demoUser2);
  portalUsers.set(demoUser2.username, demoUser2);
  portalUsers.set(alamoUser.email, alamoUser);
  portalUsers.set(alamoUser.username, alamoUser);

  // Portal Register Endpoint
  app.post("/api/portal/register", [verifyTurnstile, validateInput], async (req: AuthenticatedRequest, res: Response) => {
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
      
      // Create new user with emailVerified: false
      const newUser = {
        id: randomId(),
        email,
        username,
        password: hashedPassword,
        role: "user",
        fullName: username,
        emailVerified: false,
        createdAt: new Date(),
      };

      portalUsers.set(email, newUser);
      portalUsers.set(username, newUser);

      // Generate email verification token
      const verificationToken = randomId();
      const now = Date.now();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
      
      emailVerificationTokens.set(verificationToken, {
        email: newUser.email,
        userId: newUser.id,
        createdAt: now,
        expiresAt: now + TWENTY_FOUR_HOURS,
      });

      // Log verification link (since we don't have email sending yet)
      const verificationLink = `/api/portal/verify-email?token=${verificationToken}`;
      console.log(`[EMAIL VERIFICATION] User ${email} - Verification link: ${verificationLink}`);
      console.log(`[EMAIL VERIFICATION] Token expires at: ${new Date(now + TWENTY_FOUR_HOURS).toISOString()}`);

      logSecurityEvent("PORTAL_USER_REGISTERED", req, { userId: newUser.id, email, emailVerified: false });

      return res.json({
        success: true,
        message: "Account created successfully. Please check your email to verify your account.",
        requiresVerification: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          fullName: newUser.fullName,
          role: newUser.role,
          emailVerified: false,
        },
      });
    } catch (error: any) {
      console.error("[ERROR] Portal registration failed:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Email Verification Endpoint
  app.get("/api/portal/verify-email", async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { token } = req.query;

      if (!token || typeof token !== 'string') {
        return res.redirect('/portal/login?error=invalid_token&message=Invalid verification link');
      }

      // Check if token exists
      const tokenData = emailVerificationTokens.get(token);
      if (!tokenData) {
        return res.redirect('/portal/login?error=invalid_token&message=Verification link is invalid or has already been used');
      }

      // Check if token has expired
      if (Date.now() > tokenData.expiresAt) {
        emailVerificationTokens.delete(token);
        return res.redirect('/portal/login?error=expired_token&message=Verification link has expired. Please request a new one.');
      }

      // Find and update user
      const user = portalUsers.get(tokenData.email);
      if (!user) {
        emailVerificationTokens.delete(token);
        return res.redirect('/portal/login?error=user_not_found&message=User not found');
      }

      // Mark user as verified
      user.emailVerified = true;
      portalUsers.set(tokenData.email, user);
      if (user.username) {
        portalUsers.set(user.username, user);
      }

      // Clear the token
      emailVerificationTokens.delete(token);

      logSecurityEvent("EMAIL_VERIFIED", req, { userId: user.id, email: tokenData.email });

      // Redirect to portal login with success message
      return res.redirect('/portal/login?verified=true&message=Email verified successfully! You can now log in.');
    } catch (error: any) {
      console.error("[ERROR] Email verification failed:", error);
      return res.redirect('/portal/login?error=verification_failed&message=Email verification failed');
    }
  });

  // Resend Verification Email Endpoint
  app.post("/api/portal/resend-verification", [validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Find user by email
      const user = portalUsers.get(email);
      if (!user) {
        // Don't reveal whether user exists for security
        return res.json({ 
          success: true, 
          message: "If an account exists with this email, a new verification link has been sent." 
        });
      }

      // Check if already verified
      if (user.emailVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }

      // Delete any existing tokens for this user
      for (const [token, data] of emailVerificationTokens.entries()) {
        if (data.email === email) {
          emailVerificationTokens.delete(token);
        }
      }

      // Generate new verification token
      const verificationToken = randomId();
      const now = Date.now();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
      
      emailVerificationTokens.set(verificationToken, {
        email: user.email,
        userId: user.id,
        createdAt: now,
        expiresAt: now + TWENTY_FOUR_HOURS,
      });

      // Log the new verification link
      const verificationLink = `/api/portal/verify-email?token=${verificationToken}`;
      console.log(`[EMAIL VERIFICATION] Resend for ${email} - Verification link: ${verificationLink}`);
      console.log(`[EMAIL VERIFICATION] Token expires at: ${new Date(now + TWENTY_FOUR_HOURS).toISOString()}`);

      logSecurityEvent("VERIFICATION_EMAIL_RESENT", req, { email });

      return res.json({
        success: true,
        message: "If an account exists with this email, a new verification link has been sent.",
      });
    } catch (error: any) {
      console.error("[ERROR] Resend verification failed:", error);
      res.status(500).json({ message: "Failed to resend verification email" });
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

      // Check email verification status (allow admin to login regardless)
      if (user.role !== 'admin' && user.emailVerified === false) {
        logSecurityEvent("PORTAL_LOGIN_UNVERIFIED", req, { email });
        return res.status(403).json({ 
          message: "Please verify your email before logging in. Check your inbox for the verification link.",
          code: "EMAIL_NOT_VERIFIED",
          email: user.email
        });
      }

      // Generate session ID for session tracking and rotation
      const sessionId = randomId();
      const now = Date.now();
      
      // Store session in session store with rotation tracking
      sessionStore.set(sessionId, {
        userId: user.id,
        createdAt: now,
        lastRotated: now,
      });

      // Derive storeRole from user or client data
      let storeRole: StoreRole = 'prospect';
      if (user.storeRole) {
        storeRole = user.storeRole as StoreRole;
      } else if (user.role === 'admin') {
        storeRole = 'admin';
      } else if (user.clientId) {
        const client = portalClients.get(user.clientId);
        if (client?.serviceType === 'managed') {
          storeRole = 'managed';
        } else if (client?.serviceType === 'comanaged') {
          storeRole = 'comanaged';
        }
      }

      // Generate JWT token using the module-level JWT_SECRET (includes storeRole for RBAC)
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role, storeRole, clientId: user.clientId || null },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Set secure session cookie with HttpOnly, Secure, and SameSite flags
      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        path: '/',
      });

      logSecurityEvent("PORTAL_USER_LOGIN", req, { userId: user.id, email, role: user.role, storeRole, sessionId });

      return res.json({
        success: true,
        token,
        sessionId,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
          storeRole,
          clientId: user.clientId || null,
        },
      });
    } catch (error: any) {
      console.error("[ERROR] Portal login failed:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Portal Logout Endpoint - Clears session cookie
  app.post("/api/portal/logout", [validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const sessionId = req.cookies?.sessionId;
      
      if (sessionId) {
        // Remove session from session store
        sessionStore.delete(sessionId);
        logSecurityEvent("SESSION_TERMINATED", req, { sessionId });
      }

      // Clear the session cookie
      res.clearCookie('sessionId', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      logSecurityEvent("PORTAL_USER_LOGOUT", req, { userId: req.user?.id || "unknown" });

      return res.json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
      console.error("[ERROR] Portal logout failed:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Portal Dashboard Stats - Enhanced with Zoho data (scoped to user)
  app.get("/api/portal/dashboard", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { zohoDeskService } = await import("./zoho/zohoDesk");
      const { zohoBillingService } = await import("./zoho/zohoBilling");
      const { zohoClient } = await import("./zoho/zohoClient");
      
      let openTickets = 0;
      let resolvedTickets = 0;
      let pendingInvoices = 0;
      let recentTickets: any[] = [];
      let zohoDataFetched = false;
      
      const userEmail = req.user?.email;
      
      // Try to get Zoho data if connected - scoped to user
      if (zohoClient.isConfigured() && userEmail) {
        try {
          // Get contact by email first to scope ticket queries
          const contact = await zohoDeskService.getContactByEmail(userEmail);
          
          if (contact) {
            // Get tickets for this specific contact
            const contactTickets = await zohoDeskService.getTicketsByContact(contact.id);
            
            openTickets = contactTickets.filter(t => 
              t.status?.toLowerCase() === "open" || t.status?.toLowerCase() === "in progress"
            ).length;
            resolvedTickets = contactTickets.filter(t => 
              t.status?.toLowerCase() === "closed" || t.status?.toLowerCase() === "resolved"
            ).length;
            recentTickets = contactTickets.slice(0, 5).map(t => ({
              id: t.id,
              ticketNumber: t.ticketNumber,
              subject: t.subject,
              status: t.status?.toLowerCase() || "open",
              priority: t.priority,
              createdAt: t.createdTime,
            }));
            zohoDataFetched = true;
          }
        } catch (deskError) {
          console.warn("Could not fetch Zoho Desk data for user:", deskError);
        }
        
        try {
          // Get invoices scoped to user's billing customer
          const customer = await zohoBillingService.getCustomerByEmail(userEmail);
          if (customer) {
            const customerInvoices = await zohoBillingService.getInvoicesByCustomer(customer.customer_id);
            pendingInvoices = customerInvoices.filter(inv => 
              inv.status?.toLowerCase() === "unpaid" || inv.status?.toLowerCase() === "overdue"
            ).length;
          }
        } catch (billingError) {
          console.warn("Could not fetch Zoho Billing data for user:", billingError);
        }
      }
      
      // Fallback to local tickets if Zoho didn't return data
      if (!zohoDataFetched) {
        const tickets = await storage.getPortalTickets(req.userId || "");
        openTickets = tickets.filter(t => t.status === "open" || t.status === "in-progress").length;
        resolvedTickets = tickets.filter(t => t.status === "resolved" || t.status === "closed").length;
        recentTickets = tickets.slice(0, 5).map(t => ({
          id: t.id,
          ticketNumber: t.ticketNumber || `#TK${String(t.id).padStart(3, '0')}`,
          subject: t.subject,
          status: t.status,
          priority: t.priority,
          createdAt: t.createdAt,
        }));
      }
      
      // Get services from Zoho subscriptions
      let services: any[] = [];
      let zohoBillingFetched = false;
      
      if (zohoClient.isConfigured() && userEmail) {
        try {
          const customer = await zohoBillingService.getCustomerByEmail(userEmail);
          if (customer) {
            const subscriptions = await zohoBillingService.getSubscriptionsByCustomer(customer.customer_id);
            services = subscriptions
              .filter(sub => sub.status === "live" || sub.status === "active")
              .map(sub => ({
                id: sub.subscription_id,
                serviceName: sub.plan?.name || sub.name,
                status: sub.status,
                amount: sub.amount,
                nextBilling: sub.next_billing_at,
                zohoLink: `https://billing.zoho.com/app#/subscriptions/${sub.subscription_id}`,
              }));
            zohoBillingFetched = true;
          }
        } catch (subError) {
          console.warn("Could not fetch Zoho subscriptions for services:", subError);
        }
      }
      
      // Fallback to placeholder services if no Zoho services found
      // This ensures the dashboard always shows something meaningful
      if (services.length === 0) {
        services = [
          { id: "svc-placeholder-1", serviceName: "Managed IT Support", status: "active" },
          { id: "svc-placeholder-2", serviceName: "Endpoint Protection", status: "active" },
          { id: "svc-placeholder-3", serviceName: "Email Security", status: "active" },
        ];
      }
      
      const dashboardStats = {
        openTickets,
        resolvedTickets,
        activeServices: services.length,
        pendingInvoices,
        recentTickets,
        services,
        zohoConnected: zohoDataFetched || zohoBillingFetched,
      };
      
      res.json(dashboardStats);
    } catch (error: any) {
      console.error("[ERROR] Dashboard fetch failed:", error);
      res.status(500).json({ message: "Failed to load dashboard" });
    }
  });

  // Portal Billing - Get subscription and invoices from Zoho Billing
  app.get("/api/portal/billing", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { zohoBillingService } = await import("./zoho/zohoBilling");
      const { zohoClient } = await import("./zoho/zohoClient");
      
      if (!zohoClient.isConfigured()) {
        return res.json({
          subscription: null,
          invoices: [],
          zohoConnected: false,
          message: "Billing integration not configured",
        });
      }
      
      let subscription = null;
      let invoices: any[] = [];
      let zohoConnected = false;
      
      try {
        const userEmail = req.user?.email;
        
        // Try to find customer by email first for proper data isolation
        let customer = null;
        if (userEmail) {
          customer = await zohoBillingService.getCustomerByEmail(userEmail);
        }
        
        if (customer) {
          // Get subscriptions for this specific customer
          const customerSubs = await zohoBillingService.getSubscriptionsByCustomer(customer.customer_id);
          subscription = customerSubs.find(s => s.status === "live") || customerSubs[0] || null;
          
          // Get invoices for this specific customer
          invoices = await zohoBillingService.getInvoicesByCustomer(customer.customer_id);
          zohoConnected = true;
        } else {
          // No customer found - return empty with message
          console.log(`No Zoho Billing customer found for: ${userEmail}`);
        }
      } catch (error) {
        console.warn("Could not fetch Zoho Billing data:", error);
      }
      
      // Add Zoho links to subscription and invoices
      const subscriptionWithLink = subscription ? {
        ...subscription,
        zohoLink: `https://billing.zoho.com/app#/subscriptions/${subscription.subscription_id}`,
      } : null;
      
      const invoicesWithLinks = invoices.map(inv => ({
        ...inv,
        zohoLink: `https://billing.zoho.com/app#/invoices/${inv.invoice_id}`,
      }));
      
      res.json({
        subscription: subscriptionWithLink,
        invoices: invoicesWithLinks,
        zohoConnected,
        message: !zohoConnected ? "Your billing account is being set up" : undefined,
      });
    } catch (error: any) {
      console.error("[ERROR] Billing fetch failed:", error);
      res.status(500).json({ message: "Failed to load billing data" });
    }
  });

  // Portal Company - Get CRM account and contacts
  app.get("/api/portal/company", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { zohoCRMService } = await import("./zoho/zohoCRM");
      const { zohoClient } = await import("./zoho/zohoClient");
      
      if (!zohoClient.isConfigured()) {
        return res.json({
          account: null,
          contacts: [],
          zohoConnected: false,
          message: "CRM integration not configured",
        });
      }
      
      let account = null;
      let contacts: any[] = [];
      let zohoConnected = false;
      
      try {
        const userEmail = req.user?.email;
        
        // Find the contact by email first, then get their associated account
        if (userEmail) {
          const contact = await zohoCRMService.getContactByEmail(userEmail);
          
          if (contact && contact.Account_Name?.id) {
            // Get the account this contact belongs to
            account = await zohoCRMService.getAccountById(contact.Account_Name.id);
            
            if (account) {
              // Get all contacts for this account
              contacts = await zohoCRMService.getContactsByAccount(account.id);
              zohoConnected = true;
            }
          } else {
            console.log(`No Zoho CRM contact/account found for: ${userEmail}`);
          }
        }
      } catch (error) {
        console.warn("Could not fetch Zoho CRM data:", error);
      }
      
      // Add Zoho links to account and contacts
      const accountWithLink = account ? {
        ...account,
        zohoLink: `https://crm.zoho.com/crm/org/tab/Accounts/${account.id}`,
      } : null;
      
      const contactsWithLinks = contacts.map(c => ({
        ...c,
        zohoLink: `https://crm.zoho.com/crm/org/tab/Contacts/${c.id}`,
      }));
      
      res.json({
        account: accountWithLink,
        contacts: contactsWithLinks,
        zohoConnected,
        message: !zohoConnected ? "Your company profile is being set up" : undefined,
      });
    } catch (error: any) {
      console.error("[ERROR] Company fetch failed:", error);
      res.status(500).json({ message: "Failed to load company data" });
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
  app.get("/api/portal/invoices", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { zohoBillingService } = await import("./zoho/zohoBilling");
      const { zohoClient } = await import("./zoho/zohoClient");
      
      let invoices: any[] = [];
      let zohoConnected = false;
      
      if (!zohoClient.isConfigured()) {
        return res.json({
          invoices: [],
          zohoConnected: false,
          message: "Billing integration not configured",
        });
      }
      
      try {
        const userEmail = req.user?.email;
        
        // Scope to authenticated user's customer account for data isolation
        if (userEmail) {
          const customer = await zohoBillingService.getCustomerByEmail(userEmail);
          
          if (customer) {
            const customerInvoices = await zohoBillingService.getInvoicesByCustomer(customer.customer_id);
            invoices = customerInvoices.map(inv => ({
              id: inv.invoice_id,
              invoiceNumber: inv.invoice_number,
              amount: inv.total.toString(),
              status: inv.status?.toLowerCase() || "pending",
              issueDate: inv.invoice_date,
              dueDate: inv.due_date,
              balance: inv.balance,
              currency: inv.currency_code,
            }));
            zohoConnected = true;
          } else {
            console.log(`No Zoho Billing customer found for invoices: ${userEmail}`);
          }
        }
      } catch (error) {
        console.warn("Could not fetch Zoho Billing invoices:", error);
      }
      
      res.json({
        invoices,
        zohoConnected,
        message: !zohoConnected ? "Your billing account is being set up" : undefined,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to load invoices" });
    }
  });

  // ===== PORTAL ORDER ROUTES =====
  
  // List orders for authenticated client
  app.get("/api/portal/orders", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { status } = req.query;
      const userId = req.userId;
      const clientId = req.user?.clientId;
      
      // Get orders from database for this user/client
      const allOrders = await storage.getStoreOrders();
      
      // Filter orders by user or client
      let userOrders = allOrders.filter(order => 
        order.userId === userId || order.clientId === clientId
      );
      
      // Apply status filter if provided
      if (status && typeof status === "string" && status !== "all") {
        userOrders = userOrders.filter(order => order.status === status);
      }
      
      // Sort by creation date (newest first)
      userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      const orders = userOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
        itemCount: Array.isArray(order.lineItems) ? order.lineItems.length : 0,
        billingName: order.billingName,
      }));
      
      logSecurityEvent("ORDERS_LIST_VIEWED", req, { 
        userId,
        clientId,
        orderCount: orders.length,
        statusFilter: status || "all"
      });
      
      res.json({ orders });
    } catch (error: any) {
      console.error("[ERROR] Failed to fetch orders:", error);
      res.status(500).json({ message: "Failed to load orders" });
    }
  });

  // Get single order detail for client
  app.get("/api/portal/orders/:id", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const clientId = req.user?.clientId;
      
      const order = await storage.getStoreOrder(id);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      // Verify the order belongs to the authenticated user/client
      if (order.userId !== userId && order.clientId !== clientId) {
        return res.status(403).json({ error: "Access denied to this order" });
      }
      
      logSecurityEvent("ORDER_DETAIL_VIEWED", req, { 
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId,
        clientId,
        orderStatus: order.status
      });
      
      res.json({
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          paymentMethod: order.paymentMethod,
          lineItems: order.lineItems || [],
          subtotal: order.subtotal,
          tax: order.tax,
          total: order.total,
          billingName: order.billingName,
          billingEmail: order.billingEmail,
          billingCompany: order.billingCompany,
          billingAddress: order.billingAddress,
          stripePaymentIntentId: order.stripePaymentIntentId,
          notes: order.notes,
          paidAt: order.paidAt,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        },
      });
    } catch (error: any) {
      console.error("[ERROR] Failed to fetch order:", error);
      res.status(500).json({ message: "Failed to load order" });
    }
  });

  // Generate receipt HTML for order
  app.get("/api/portal/orders/:id/receipt", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const clientId = req.user?.clientId;
      
      const order = await storage.getStoreOrder(id);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      // Verify the order belongs to the authenticated user/client
      if (order.userId !== userId && order.clientId !== clientId) {
        return res.status(403).json({ error: "Access denied to this order" });
      }
      
      const lineItems = Array.isArray(order.lineItems) ? order.lineItems : [];
      const billingAddress = order.billingAddress as { street?: string; city?: string; state?: string; zipCode?: string; country?: string } | null;
      
      // Generate HTML receipt
      const receiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receipt - ${order.orderNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #333; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 24px; font-weight: bold; color: #5034ff; margin-bottom: 8px; }
    .receipt-title { font-size: 18px; color: #666; }
    .order-info { display: flex; justify-content: space-between; margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    .order-info div { }
    .order-info .label { font-size: 12px; color: #666; margin-bottom: 4px; }
    .order-info .value { font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    th { text-align: left; padding: 12px; border-bottom: 2px solid #e0e0e0; font-weight: 600; }
    td { padding: 12px; border-bottom: 1px solid #e0e0e0; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 300px; }
    .totals .row { display: flex; justify-content: space-between; padding: 8px 0; }
    .totals .total { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 12px; margin-top: 8px; }
    .billing { margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    .billing h3 { margin: 0 0 12px 0; font-size: 14px; color: #666; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Digerati Experts</div>
    <div class="receipt-title">Order Receipt</div>
  </div>
  
  <div class="order-info">
    <div>
      <div class="label">Order Number</div>
      <div class="value">${order.orderNumber}</div>
    </div>
    <div>
      <div class="label">Order Date</div>
      <div class="value">${new Date(order.createdAt).toLocaleDateString()}</div>
    </div>
    <div>
      <div class="label">Status</div>
      <div class="value">${(order.status || "pending").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</div>
    </div>
    ${order.paidAt ? `
    <div>
      <div class="label">Paid On</div>
      <div class="value">${new Date(order.paidAt).toLocaleDateString()}</div>
    </div>
    ` : ""}
  </div>

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th class="text-right">Qty</th>
        <th class="text-right">Unit Price</th>
        <th class="text-right">Total</th>
      </tr>
    </thead>
    <tbody>
      ${lineItems.map((item: any) => `
        <tr>
          <td>${item.name || "Item"}<br><small style="color:#666">SKU: ${item.sku || "N/A"}</small></td>
          <td class="text-right">${item.quantity || 1}</td>
          <td class="text-right">$${parseFloat(item.unitPrice || "0").toFixed(2)}</td>
          <td class="text-right">$${parseFloat(item.total || "0").toFixed(2)}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>

  <div class="totals">
    <div class="row">
      <span>Subtotal</span>
      <span>$${parseFloat(order.subtotal).toFixed(2)}</span>
    </div>
    <div class="row">
      <span>Tax</span>
      <span>$${parseFloat(order.tax || "0").toFixed(2)}</span>
    </div>
    <div class="row total">
      <span>Total</span>
      <span>$${parseFloat(order.total).toFixed(2)}</span>
    </div>
  </div>

  <div class="billing">
    <h3>Billing Information</h3>
    <div>${order.billingName || "N/A"}</div>
    ${order.billingCompany ? `<div>${order.billingCompany}</div>` : ""}
    ${order.billingEmail ? `<div>${order.billingEmail}</div>` : ""}
    ${billingAddress?.street ? `<div>${billingAddress.street}</div>` : ""}
    ${billingAddress?.city || billingAddress?.state || billingAddress?.zipCode ? `
      <div>${billingAddress.city || ""}${billingAddress.city && billingAddress.state ? ", " : ""}${billingAddress.state || ""} ${billingAddress.zipCode || ""}</div>
    ` : ""}
  </div>

  <div class="footer">
    <p>Thank you for your business!</p>
    <p>Digerati Experts | support@digeratiexperts.com | (480) 555-1000</p>
  </div>
</body>
</html>
      `;
      
      logSecurityEvent("RECEIPT_GENERATED", req, { 
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId,
        clientId,
        total: order.total,
        orderStatus: order.status
      });
      
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Content-Disposition", `attachment; filename="receipt-${order.orderNumber}.html"`);
      res.send(receiptHtml);
    } catch (error: any) {
      console.error("[ERROR] Failed to generate receipt:", error);
      res.status(500).json({ message: "Failed to generate receipt" });
    }
  });

  // ===== ADMIN TENANT MANAGEMENT =====
  
  // List all companies (admin only)
  app.get("/api/portal/admin/companies", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const companies = Array.from(portalClients.values()).map(client => ({
        id: client.id,
        companyName: client.companyName,
        contactEmail: client.contactEmail,
        status: client.status || "active",
        type: client.type || "client", // "msp" for Digerati, "client" for customers
        userCount: Array.from(portalUsers.values()).filter(u => u.clientId === client.id).length,
        createdAt: client.createdAt,
      }));
      
      res.json({ companies });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Admin tenant selector - quick list for dropdown
  app.get("/api/portal/admin/tenants", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
      // Get MSP company first, then clients sorted by name
      const allCompanies = Array.from(portalClients.values());
      const mspCompanies = allCompanies.filter(c => c.type === "msp").map(c => ({
        id: c.id,
        companyName: c.companyName,
        type: "msp",
      }));
      const clientCompanies = allCompanies
        .filter(c => c.type !== "msp")
        .sort((a, b) => a.companyName.localeCompare(b.companyName))
        .map(c => ({
          id: c.id,
          companyName: c.companyName,
          type: "client",
        }));
      
      res.json({ 
        tenants: [...mspCompanies, ...clientCompanies],
        mspCount: mspCompanies.length,
        clientCount: clientCompanies.length,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get company details with users (admin only)
  app.get("/api/portal/admin/companies/:id", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.post("/api/portal/admin/companies", [authMiddleware, requireAdmin, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
        type: "client", // New companies are always clients, not MSP
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
  app.put("/api/portal/admin/companies/:id", [authMiddleware, requireAdmin, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.post("/api/portal/admin/impersonate", [authMiddleware, requireAdmin, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.post("/api/portal/admin/stop-impersonation", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.get("/api/portal/admin/companies/:id/files", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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

  // Get files for current user's company (regular users + admin impersonation)
  app.get("/api/portal/my-files", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      let clientId: string | null = null;
      let companyName: string = "";
      
      // Check if admin is impersonating a company
      const impersonatingCompanyId = (req.user as any)?.impersonatingCompanyId;
      if (impersonatingCompanyId) {
        const company = portalClients.get(impersonatingCompanyId);
        if (company) {
          clientId = impersonatingCompanyId;
          companyName = company.companyName;
        }
      } else {
        // Regular user - get their company
        const user = portalUsers.get(req.user?.email || "");
        if (user) {
          const company = portalClients.get(user.clientId);
          if (company) {
            clientId = user.clientId;
            companyName = company.companyName;
          }
        }
      }
      
      if (!clientId) {
        return res.json({ files: [], companyName: "Your Company" });
      }
      
      // Get tenant files from storage
      const tenantFiles = await storage.getTenantFilesByClientId(clientId);
      
      res.json({ files: tenantFiles, companyName });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Upload file for a tenant (admin only)
  app.post("/api/portal/admin/companies/:id/files", [authMiddleware, requireAdmin, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.delete("/api/portal/admin/companies/:companyId/files/:fileId", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.get("/api/portal/admin/companies/:id/metrics", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.post("/api/lead-quote", [verifyTurnstile, leadQuoteRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
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
      logger.info("[LEAD] Quote form submitted", { email, company, recommendedPlan, timestamp });
      logSecurityEvent("LEAD_QUOTE_SUBMITTED", req, { email, company, recommendedPlan });

      // Emit lead event for cross-service handling (email notifications, CRM sync)
      eventBus.emit(EventTypes.LEAD_CREATED, {
        id: leadData.id,
        name: `${firstName} ${lastName}`,
        email,
        company,
        source: source || "quote_wizard",
        message: `Recommended Plan: ${recommendedPlan}, Seats: ${seats}`,
      }, "lead-quote");

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
  app.post("/api/contact", [verifyTurnstile, leadQuoteRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
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
      logger.info("[CONTACT] Form submitted", { name, email, company, service, timestamp: new Date().toISOString() });
      logSecurityEvent("CONTACT_FORM_SUBMITTED", req, { email, company, service });

      // Emit contact event for cross-service handling (email notifications)
      eventBus.emit(EventTypes.CONTACT_FORM_SUBMITTED, {
        id: contactData.id,
        name,
        email,
        company,
        phone,
        message,
        source: "contact_form",
      }, "contact-form");

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

  // ========== STORE CART ROUTES ==========
  
  // In-memory cart storage (per user session)
  const userCarts: Map<string, { productId: string; quantity: number; name: string; price: number; sku: string }[]> = new Map();
  
  // Add item to cart
  app.post("/api/store/cart/add", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { productId, quantity, name, price, sku } = req.body;
      
      if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ error: "Product ID and valid quantity are required" });
      }
      
      const userId = req.userId || "anonymous";
      const cart = userCarts.get(userId) || [];
      
      // Check if item already exists in cart
      const existingIndex = cart.findIndex(item => item.productId === productId);
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({ productId, quantity, name: name || "Product", price: price || 0, sku: sku || "" });
      }
      
      userCarts.set(userId, cart);
      
      logSecurityEvent("CART_ITEM_ADDED", req, { 
        productId, 
        quantity, 
        userId,
        clientId: req.user?.clientId,
        cartItemCount: cart.length
      });
      
      res.json({ success: true, cart, itemCount: cart.length });
    } catch (error: any) {
      console.error("[CART ADD ERROR]", error);
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  });
  
  // Remove item from cart
  app.post("/api/store/cart/remove", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { productId, quantity } = req.body;
      
      if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
      }
      
      const userId = req.userId || "anonymous";
      let cart = userCarts.get(userId) || [];
      
      const existingIndex = cart.findIndex(item => item.productId === productId);
      if (existingIndex >= 0) {
        if (quantity && quantity < cart[existingIndex].quantity) {
          cart[existingIndex].quantity -= quantity;
        } else {
          cart = cart.filter(item => item.productId !== productId);
        }
      }
      
      userCarts.set(userId, cart);
      
      logSecurityEvent("CART_ITEM_REMOVED", req, { 
        productId, 
        userId,
        clientId: req.user?.clientId,
        cartItemCount: cart.length
      });
      
      res.json({ success: true, cart, itemCount: cart.length });
    } catch (error: any) {
      console.error("[CART REMOVE ERROR]", error);
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  });
  
  // Clear cart
  app.post("/api/store/cart/clear", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.userId || "anonymous";
      const previousCart = userCarts.get(userId) || [];
      
      userCarts.delete(userId);
      
      logSecurityEvent("CART_CLEARED", req, { 
        userId,
        clientId: req.user?.clientId,
        clearedItemCount: previousCart.length
      });
      
      res.json({ success: true, cart: [], itemCount: 0 });
    } catch (error: any) {
      console.error("[CART CLEAR ERROR]", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });
  
  // Get cart contents
  app.get("/api/store/cart", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.userId || "anonymous";
      const cart = userCarts.get(userId) || [];
      res.json({ cart, itemCount: cart.length });
    } catch (error: any) {
      console.error("[CART GET ERROR]", error);
      res.status(500).json({ error: "Failed to get cart" });
    }
  });

  // ========== STORE CHECKOUT ROUTES ==========

  // Create Stripe checkout session - requires 'comanaged' or 'admin' role for purchasing
  app.post("/api/store/checkout/stripe", [authMiddleware, requireRole('comanaged', 'admin'), validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { lineItems, billing, subtotal, total } = req.body;
      
      if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
        return res.status(400).json({ error: "Line items are required" });
      }
      
      if (!billing || !billing.email || !billing.name) {
        return res.status(400).json({ error: "Billing name and email are required" });
      }

      const { getUncachableStripeClient } = await import("./stripeClient");
      const stripe = await getUncachableStripeClient();
      
      const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      const stripeLineItems = lineItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `SKU: ${item.sku}`,
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      }));

      const baseUrl = process.env.REPLIT_DEPLOYMENT === "1" 
        ? `https://${process.env.REPLIT_DEPLOYMENT_URL || process.env.REPL_SLUG + '.replit.app'}`
        : `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: stripeLineItems,
        mode: "payment",
        customer_email: billing.email,
        success_url: `${baseUrl}/store/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/store/checkout`,
        metadata: {
          orderNumber,
          lineItems: JSON.stringify(lineItems.slice(0, 5)),
          billingName: billing.name,
          billingEmail: billing.email,
          billingCompany: billing.company || "",
        },
      });

      const { db } = await import("./db");
      const { storeOrders } = await import("@shared/schema");
      
      const [order] = await db.insert(storeOrders).values({
        orderNumber,
        status: "awaiting_payment",
        paymentMethod: "stripe",
        lineItems,
        subtotal: subtotal.toString(),
        tax: "0",
        total: total.toString(),
        stripeSessionId: session.id,
        billingEmail: billing.email,
        billingName: billing.name,
        billingCompany: billing.company || null,
      }).returning();

      logSecurityEvent("CHECKOUT_STARTED", req, { 
        orderId: order.id, 
        orderNumber, 
        cartTotal: total, 
        itemCount: lineItems.length, 
        userId: req.userId,
        clientId: req.user?.clientId,
        paymentMethod: "stripe"
      });
      
      res.json({ url: session.url, orderId: order.id });
    } catch (error: any) {
      console.error("[STRIPE CHECKOUT ERROR]", error);
      logSecurityEvent("CHECKOUT_FAILED", req, { 
        error: error.message, 
        userId: req.userId,
        clientId: req.user?.clientId 
      });
      res.status(500).json({ error: error.message || "Failed to create checkout session" });
    }
  });

  // Create order (for quote requests or other payment methods) - requires 'comanaged' or 'admin' role
  app.post("/api/store/orders", [authMiddleware, requireRole('comanaged', 'admin'), validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { lineItems, billing, paymentMethod, status, subtotal, total, notes } = req.body;
      
      if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
        return res.status(400).json({ error: "Line items are required" });
      }
      
      if (!billing || !billing.email || !billing.name) {
        return res.status(400).json({ error: "Billing name and email are required" });
      }

      const { db } = await import("./db");
      const { storeOrders } = await import("@shared/schema");
      
      const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const [order] = await db.insert(storeOrders).values({
        orderNumber,
        status: status || "pending",
        paymentMethod: paymentMethod || "quote_request",
        lineItems,
        subtotal: subtotal.toString(),
        tax: "0",
        total: total.toString(),
        billingEmail: billing.email,
        billingName: billing.name,
        billingCompany: billing.company || null,
        notes: notes || null,
      }).returning();

      logSecurityEvent("ORDER_CREATED", req, { 
        orderId: order.id, 
        orderNumber: order.orderNumber,
        clientId: req.user?.clientId,
        userId: req.userId,
        total,
        paymentMethod: paymentMethod || "quote_request",
        itemCount: lineItems.length
      });
      
      res.json({ orderId: order.id, orderNumber: order.orderNumber });
    } catch (error: any) {
      console.error("[CREATE ORDER ERROR]", error);
      res.status(500).json({ error: error.message || "Failed to create order" });
    }
  });

  // Get order by ID or session ID
  app.get("/api/store/orders/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { db } = await import("./db");
      const { storeOrders } = await import("@shared/schema");
      const { eq, or } = await import("drizzle-orm");
      
      const [order] = await db.select().from(storeOrders).where(
        or(
          eq(storeOrders.id, id),
          eq(storeOrders.stripeSessionId, id)
        )
      ).limit(1);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error: any) {
      console.error("[GET ORDER ERROR]", error);
      res.status(500).json({ error: error.message || "Failed to get order" });
    }
  });

  // ========== STORE QUOTE REQUESTS ==========

  // Create quote request - allows all authenticated users (any role can request a quote)
  app.post("/api/store/quote-requests", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { contactName, contactEmail, contactPhone, companyName, message, requestedItems } = req.body;
      
      if (!contactName || !contactEmail) {
        return res.status(400).json({ error: "Contact name and email are required" });
      }
      
      if (!requestedItems || !Array.isArray(requestedItems) || requestedItems.length === 0) {
        return res.status(400).json({ error: "Requested items are required" });
      }

      const { db } = await import("./db");
      const { storeQuoteRequests } = await import("@shared/schema");
      
      // Generate quote number in QR-YYYYMMDD-XXXX format
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const quoteNumber = `QR-${dateStr}-${randomSuffix}`;

      const [quoteRequest] = await db.insert(storeQuoteRequests).values({
        quoteNumber,
        contactName,
        contactEmail,
        contactPhone: contactPhone || null,
        companyName: companyName || null,
        message: message || null,
        requestedItems,
        status: "pending",
      }).returning();

      console.log(`[QUOTE REQUEST] Created: ${quoteNumber} for ${contactEmail}`);
      
      logSecurityEvent("QUOTE_REQUESTED", req, { 
        quoteId: quoteRequest.id, 
        quoteNumber,
        clientId: req.user?.clientId,
        userId: req.userId,
        contactEmail,
        companyName,
        itemCount: requestedItems.length,
        items: requestedItems.map((item: any) => ({ id: item.id, name: item.name, quantity: item.quantity }))
      });

      res.json({
        id: quoteRequest.id,
        quoteNumber: quoteRequest.quoteNumber,
        message: "Quote request submitted successfully",
      });
    } catch (error: any) {
      console.error("[CREATE QUOTE REQUEST ERROR]", error);
      res.status(500).json({ error: error.message || "Failed to create quote request" });
    }
  });

  // Get quote request by ID
  app.get("/api/store/quote-requests/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { db } = await import("./db");
      const { storeQuoteRequests } = await import("@shared/schema");
      const { eq, or } = await import("drizzle-orm");
      
      const [quoteRequest] = await db.select().from(storeQuoteRequests).where(
        or(
          eq(storeQuoteRequests.id, id),
          eq(storeQuoteRequests.quoteNumber, id)
        )
      ).limit(1);
      
      if (!quoteRequest) {
        return res.status(404).json({ error: "Quote request not found" });
      }

      res.json(quoteRequest);
    } catch (error: any) {
      console.error("[GET QUOTE REQUEST ERROR]", error);
      res.status(500).json({ error: error.message || "Failed to get quote request" });
    }
  });

  // Stripe webhook handler for checkout.session.completed
  app.post("/api/webhooks/stripe", async (req: Request, res: Response) => {
    try {
      const { getUncachableStripeClient, getStripeSecretKey } = await import("./stripeClient");
      const stripe = await getUncachableStripeClient();
      
      const sig = req.headers["stripe-signature"];
      if (!sig) {
        return res.status(400).json({ error: "Missing stripe-signature header" });
      }

      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      let event;
      
      if (webhookSecret) {
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } catch (err: any) {
          console.error("[STRIPE WEBHOOK SIGNATURE ERROR]", err.message);
          return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
        }
      } else {
        event = req.body;
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const sessionId = session.id;
        
        const { db } = await import("./db");
        const { storeOrders } = await import("@shared/schema");
        const { eq } = await import("drizzle-orm");
        
        // Get the order to retrieve its details for logging
        const [existingOrder] = await db.select().from(storeOrders)
          .where(eq(storeOrders.stripeSessionId, sessionId)).limit(1);
        
        const oldStatus = existingOrder?.status || "unknown";
        
        await db.update(storeOrders)
          .set({
            status: "paid",
            stripePaymentIntentId: session.payment_intent,
            paidAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(storeOrders.stripeSessionId, sessionId));
          
        console.log(`[STRIPE WEBHOOK] Order paid: session=${sessionId}`);
        
        // Log checkout completion and order status change
        console.log(`[SECURITY] CHECKOUT_COMPLETED`, { 
          orderId: existingOrder?.id,
          orderNumber: existingOrder?.orderNumber,
          paymentMethod: "stripe",
          total: existingOrder?.total,
          stripeSessionId: sessionId,
          stripePaymentIntentId: session.payment_intent
        });
        
        console.log(`[SECURITY] ORDER_STATUS_CHANGED`, { 
          orderId: existingOrder?.id,
          orderNumber: existingOrder?.orderNumber,
          oldStatus,
          newStatus: "paid",
          triggeredBy: "stripe_webhook"
        });
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error("[STRIPE WEBHOOK ERROR]", error);
      res.status(500).json({ error: error.message || "Webhook handler failed" });
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
  app.get("/api/zoho/desk/tickets", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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

      // Check for existing contact or create one if needed
      let contactId: string | undefined;
      const contact = await zohoDeskService.getContactByEmail(req.user?.email);
      if (contact) {
        contactId = contact.id;
      }
      
      const ticket = await zohoDeskService.createTicket({
        subject,
        description,
        contactId, // Use contactId if we found one
        email: req.user?.email,
        priority: priority || "Medium",
      });
      
      res.json(ticket);
    } catch (error: any) {
      console.error("[ZOHO TICKET ERROR]", error.response?.data || error.message);
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
  app.get("/api/zoho/crm/accounts", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.get("/api/zoho/crm/contacts", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.get("/api/zoho/crm/deals", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.get("/api/zoho/billing/subscriptions", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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
  app.get("/api/zoho/billing/invoices", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
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

  // ========== STORE CLIENT AUTH ROUTES ==========

  // Demo client pricing - in production this would come from a database
  const clientPricingData: Map<string, { productId: string; customPrice: number; discountPercent: number }[]> = new Map([
    ["client-1", [
      { productId: "prod-010", customPrice: 35, discountPercent: 10 },
      { productId: "prod-011", customPrice: 22, discountPercent: 12 },
      { productId: "prod-040", customPrice: 22.50, discountPercent: 10 },
    ]],
    ["client-2", [
      { productId: "prod-010", customPrice: 32, discountPercent: 18 },
      { productId: "prod-012", customPrice: 5, discountPercent: 17 },
    ]],
    ["client-3", [
      { productId: "prod-010", customPrice: 37, discountPercent: 5 },
      { productId: "prod-035", customPrice: 160, discountPercent: 9 },
      { productId: "prod-036", customPrice: 200, discountPercent: 11 },
    ]],
    ["client-4", [
      { productId: "prod-010", customPrice: 36, discountPercent: 8 },
      { productId: "prod-030", customPrice: 179, discountPercent: 10 },
    ]],
    ["client-5", [
      { productId: "prod-010", customPrice: 34, discountPercent: 13 },
      { productId: "prod-011", customPrice: 20, discountPercent: 20 },
      { productId: "prod-030", customPrice: 169, discountPercent: 15 },
      { productId: "prod-040", customPrice: 20, discountPercent: 20 },
    ]],
  ]);

  // Get client info for store (returns client type)
  app.get("/api/store/client-info", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userEmail = req.user?.email;
      if (!userEmail) {
        return res.json({ clientType: "public", clientId: null });
      }

      const user = portalUsers.get(userEmail);
      if (!user || !user.clientId) {
        return res.json({ clientType: "public", clientId: null });
      }

      const client = portalClients.get(user.clientId);
      if (!client) {
        return res.json({ clientType: "public", clientId: null });
      }

      const serviceType = client.serviceType || "public";
      const clientType = serviceType === "managed" ? "managed" : 
                         serviceType === "comanaged" ? "comanaged" : "public";

      res.json({
        clientType,
        clientId: user.clientId,
        companyName: client.companyName,
      });
    } catch (error: any) {
      console.error("[ERROR] Failed to get client info:", error);
      res.status(500).json({ error: "Failed to get client info" });
    }
  });

  // Get client-specific pricing
  app.get("/api/store/client-pricing", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userEmail = req.user?.email;
      if (!userEmail) {
        return res.json({ pricing: [] });
      }

      const user = portalUsers.get(userEmail);
      if (!user || !user.clientId) {
        return res.json({ pricing: [] });
      }

      const pricing = clientPricingData.get(user.clientId) || [];
      res.json({ pricing });
    } catch (error: any) {
      console.error("[ERROR] Failed to get client pricing:", error);
      res.status(500).json({ error: "Failed to get client pricing" });
    }
  });

  // ========== ADMIN PRICING ROUTES ==========
  
  // In-memory product pricing store (productId -> basePrice)
  const productPricing: Map<string, number> = new Map();
  
  // Update product pricing (admin only)
  app.post("/api/admin/pricing/update", [authMiddleware, requireAdmin, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { productId, newPrice } = req.body;
      
      if (!productId || newPrice === undefined || newPrice < 0) {
        return res.status(400).json({ error: "Product ID and valid price are required" });
      }
      
      const oldPrice = productPricing.get(productId) || 0;
      productPricing.set(productId, newPrice);
      
      logSecurityEvent("PRICING_UPDATED", req, { 
        productId, 
        oldPrice, 
        newPrice, 
        adminId: req.userId,
        adminEmail: req.user?.email
      });
      
      res.json({ success: true, productId, oldPrice, newPrice });
    } catch (error: any) {
      console.error("[PRICING UPDATE ERROR]", error);
      res.status(500).json({ error: "Failed to update pricing" });
    }
  });
  
  // Set client-specific pricing (admin only)
  app.post("/api/admin/client-pricing/set", [authMiddleware, requireAdmin, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { clientId, productId, customPrice, discountPercent } = req.body;
      
      if (!clientId || !productId) {
        return res.status(400).json({ error: "Client ID and Product ID are required" });
      }
      
      if (customPrice === undefined && discountPercent === undefined) {
        return res.status(400).json({ error: "Either custom price or discount percent is required" });
      }
      
      // Get or create client pricing array
      let clientPricing = clientPricingData.get(clientId) || [];
      
      // Check if pricing already exists for this product
      const existingIndex = clientPricing.findIndex(p => p.productId === productId);
      const oldPricing = existingIndex >= 0 ? clientPricing[existingIndex] : null;
      
      const newPricingEntry = {
        productId,
        customPrice: customPrice || oldPricing?.customPrice || 0,
        discountPercent: discountPercent !== undefined ? discountPercent : (oldPricing?.discountPercent || 0)
      };
      
      if (existingIndex >= 0) {
        clientPricing[existingIndex] = newPricingEntry;
      } else {
        clientPricing.push(newPricingEntry);
      }
      
      clientPricingData.set(clientId, clientPricing);
      
      logSecurityEvent("CLIENT_PRICING_SET", req, { 
        clientId, 
        productId, 
        oldPrice: oldPricing?.customPrice,
        oldDiscount: oldPricing?.discountPercent,
        newPrice: newPricingEntry.customPrice,
        discount: newPricingEntry.discountPercent, 
        adminId: req.userId,
        adminEmail: req.user?.email
      });
      
      res.json({ success: true, clientId, productId, pricing: newPricingEntry });
    } catch (error: any) {
      console.error("[CLIENT PRICING SET ERROR]", error);
      res.status(500).json({ error: "Failed to set client pricing" });
    }
  });
  
  // Get all client pricing (admin only)
  app.get("/api/admin/client-pricing/:clientId", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { clientId } = req.params;
      const pricing = clientPricingData.get(clientId) || [];
      
      res.json({ clientId, pricing });
    } catch (error: any) {
      console.error("[GET CLIENT PRICING ERROR]", error);
      res.status(500).json({ error: "Failed to get client pricing" });
    }
  });
  
  // Delete client-specific pricing (admin only)
  app.delete("/api/admin/client-pricing/:clientId/:productId", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { clientId, productId } = req.params;
      
      let clientPricing = clientPricingData.get(clientId) || [];
      const oldPricing = clientPricing.find(p => p.productId === productId);
      
      clientPricing = clientPricing.filter(p => p.productId !== productId);
      clientPricingData.set(clientId, clientPricing);
      
      logSecurityEvent("CLIENT_PRICING_REMOVED", req, { 
        clientId, 
        productId, 
        oldPrice: oldPricing?.customPrice,
        oldDiscount: oldPricing?.discountPercent,
        adminId: req.userId,
        adminEmail: req.user?.email
      });
      
      res.json({ success: true, clientId, productId });
    } catch (error: any) {
      console.error("[DELETE CLIENT PRICING ERROR]", error);
      res.status(500).json({ error: "Failed to delete client pricing" });
    }
  });

  // ===== EMAIL TEST ENDPOINT (Admin only) =====
  app.post("/api/admin/test-email", [authMiddleware, requireAdmin], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await notificationService.testEmailConnection();
      logger.info("Email test requested", { 
        success: result.success, 
        adminEmail: req.user?.email 
      });
      res.json(result);
    } catch (error: any) {
      logger.error("Email test failed", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Email status check (no auth required for health checks)
  app.get("/api/email-status", async (req: Request, res: Response) => {
    const hasToken = !!process.env.ZEPTOMAIL_API_TOKEN;
    res.json({
      configured: hasToken,
      provider: "ZeptoMail",
      sender: "noreply@digeratiexperts.com",
    });
  });

  return app;
}
