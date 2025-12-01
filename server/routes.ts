import { type Express, type Request, type Response, NextFunction } from "express";
import { storage } from "./storage";
import { randomBytes, createHash } from "crypto";
import rateLimit from "express-rate-limit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
          ticketNumber: `#TK${String(ticket.id).padStart(3, '0')}`,
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
  // In-memory user storage for demo (replace with database in production)
  const portalUsers: Map<string, any> = new Map();
  
  // Admin credentials - CHANGE THESE IN PRODUCTION
  const adminUser = {
    id: "admin-001",
    email: "admin@digeratiexperts.com",
    username: "admin",
    password: "Admin123!",
    role: "admin",
    fullName: "Administrator",
  };
  
  // Initialize with admin user
  portalUsers.set(adminUser.email, adminUser);
  portalUsers.set(adminUser.username, adminUser);

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

      // Create new user
      const newUser = {
        id: randomId(),
        email,
        username,
        password, // In production: hash this with bcrypt
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

      if (!user || user.password !== password) {
        logSecurityEvent("PORTAL_LOGIN_FAILED", req, { email });
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate simple token (in production: use JWT)
      const token = `portal_${user.id}_${randomId()}`;

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

  return app;
}
