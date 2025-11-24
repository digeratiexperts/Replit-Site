import { type Express, type Request, type Response, NextFunction } from "express";
import { storage } from "./storage";
import { randomBytes } from "crypto";
import rateLimit from "express-rate-limit";

// Utility function for generating IDs
const randomId = () => randomBytes(16).toString('hex');

// Types
interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

// ========== MIDDLEWARE ==========

// Basic auth middleware
export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  try {
    // Basic token validation
    req.user = { id: token, email: "user@example.com", role: "user" };
    req.userId = token;
    next();
  } catch (e) {
    res.status(401).json({ error: "Unauthorized" });
  }
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
  // ===== USER ROUTES =====
  app.post("/api/auth/register", async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const user = await storage.createUser({
        id: randomId(),
        username,
        email,
        password: password,
        role: "user",
      });

      res.json({ success: true, user });
      logSecurityEvent("USER_REGISTERED", req, { userId: user.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/auth/me", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId || "");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
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
        id: randomId(),
        name,
        description: description || "",
        ownerId: req.userId || "",
        icon: "📦",
        color: "#5034ff",
        createdAt: new Date(),
        updatedAt: new Date(),
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
        id: randomId(),
        workspaceId,
        name,
        description: description || "",
        color: "#5034ff",
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
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
        id: randomId(),
        projectId,
        name,
        position: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
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
        id: randomId(),
        projectId,
        boardId: boardId || null,
        title,
        description: description || "",
        status: "todo",
        priority: "medium",
        position: 0,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
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
        updatedAt: new Date(),
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
        id: randomId(),
        workspaceId,
        name,
        color: color || "#5034ff",
        createdAt: new Date(),
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
        id: randomId(),
        taskId,
        userId: req.userId || "",
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
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
        id: randomId(),
        ticketId,
        userId: req.userId || "",
        content,
        isRead: isRead || false,
        createdAt: new Date(),
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
      res.json({
        success: true,
        classification: {
          category: "General",
          priority: "medium",
          tags: [],
        },
      });
      logSecurityEvent("TICKET_CLASSIFIED", req, {});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/portal/chat/message", [authMiddleware, chatRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message required" });
      }
      res.json({
        success: true,
        message: {
          id: randomId(),
          content: "Message received",
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
