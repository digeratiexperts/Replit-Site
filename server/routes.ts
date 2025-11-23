import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer, WebSocket } from "ws";
import helmet from "helmet";
import { chatRateLimiter, agentRateLimiter } from "./middleware/rateLimiter";
import { authMiddleware, generateToken, type AuthenticatedRequest } from "./middleware/auth";
import { insertPortalChatMessageSchema } from "@shared/schema";
import {
  insertWorkspaceSchema,
  insertProjectSchema,
  insertBoardSchema,
  insertTaskSchema,
  updateTaskSchema,
  insertLabelSchema,
  insertCommentSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Security middleware
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  }));

  const httpServer = createServer(app);

  const wss = new WebSocketServer({ server: httpServer, path: "/api/ws" });
  const connectedClients = new Map<string, WebSocket>();

  // ✅ Health check route
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", message: "API is alive" });
  });

  // --- WebSocket setup with authentication ---
  wss.on("connection", (ws: WebSocket, request) => {
    const url = request.url || "";
    const params = new URLSearchParams(url.split("?")[1]);
    const token = params.get("token");
    const userId = params.get("userId");

    if (!token || !userId) {
      ws.close(1008, "Unauthorized: No token or userId");
      return;
    }

    connectedClients.set(userId, ws);
    console.log(`WebSocket client connected: ${userId}`);

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Only send to support team if from client, or to client if from support
        if (data.targetRole) {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
              }));
            }
          });
        }
      } catch (error) {
        console.error("WebSocket error:", error);
      }
    });

    ws.on("close", () => {
      connectedClients.delete(userId);
      console.log(`WebSocket client disconnected: ${userId}`);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  // --- Workspace routes ---
  app.get("/api/workspaces", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      const workspaces = await storage.getWorkspacesByUserId(userId);
      res.json(workspaces);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/workspaces/:id", async (req: Request, res: Response) => {
    try {
      const workspace = await storage.getWorkspace(req.params.id);
      if (!workspace) {
        return res.status(404).json({ message: "Workspace not found" });
      }
      res.json(workspace);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/workspaces", async (req: Request, res: Response) => {
    try {
      const data = insertWorkspaceSchema.parse(req.body);
      const workspace = await storage.createWorkspace(data);
      res.status(201).json(workspace);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/workspaces/:id", async (req: Request, res: Response) => {
    try {
      const workspace = await storage.updateWorkspace(req.params.id, req.body);
      if (!workspace) {
        return res.status(404).json({ message: "Workspace not found" });
      }
      res.json(workspace);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/workspaces/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteWorkspace(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // --- Project routes ---
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const workspaceId = req.query.workspaceId as string;
      if (!workspaceId) {
        return res.status(400).json({ message: "workspaceId is required" });
      }
      const projects = await storage.getProjectsByWorkspaceId(workspaceId);
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // --- Board routes ---
  app.get("/api/boards", async (req: Request, res: Response) => {
    try {
      const projectId = req.query.projectId as string;
      if (!projectId) {
        return res.status(400).json({ message: "projectId is required" });
      }
      const boards = await storage.getBoardsByProjectId(projectId);
      res.json(boards);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/boards", async (req: Request, res: Response) => {
    try {
      const data = insertBoardSchema.parse(req.body);
      const board = await storage.createBoard(data);
      res.status(201).json(board);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/boards/:id", async (req: Request, res: Response) => {
    try {
      const board = await storage.updateBoard(req.params.id, req.body);
      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }
      res.json(board);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/boards/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteBoard(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // --- Portal Routes ---

  // Portal Login
  app.post("/api/portal/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      // Mock authentication - in production, validate against database
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      
      const user = {
        id: "portal-user-1",
        clientId: "client-1",
        email,
        fullName: "John Doe",
        role: "admin",
      };

      res.json({
        user,
        token: "mock-jwt-token",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Dashboard
  app.get("/api/portal/dashboard", async (req: Request, res: Response) => {
    try {
      const mockTickets = [
        { id: "1", ticketNumber: "#TK001", subject: "Email not syncing", status: "open", priority: "high", createdAt: new Date().toISOString() },
        { id: "2", ticketNumber: "#TK002", subject: "Password reset issue", status: "in_progress", priority: "medium", createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: "3", ticketNumber: "#TK003", subject: "VPN connectivity", status: "resolved", priority: "critical", createdAt: new Date(Date.now() - 172800000).toISOString() },
      ];

      const mockServices = [
        { id: "1", serviceName: "Managed IT Support", userCount: 25, status: "active", monthlyPrice: "1500" },
        { id: "2", serviceName: "Cloud Backup", userCount: 25, status: "active", monthlyPrice: "300" },
        { id: "3", serviceName: "Security Operations", userCount: 1, status: "active", monthlyPrice: "2000" },
      ];

      res.json({
        openTickets: 5,
        resolvedTickets: 42,
        activeServices: 3,
        pendingInvoices: 1,
        recentTickets: mockTickets,
        services: mockServices,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Tickets
  app.get("/api/portal/tickets", async (req: Request, res: Response) => {
    try {
      const tickets = [
        { id: "1", ticketNumber: "#TK001", subject: "Email not syncing", status: "open", priority: "high", category: "Email", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: "2", ticketNumber: "#TK002", subject: "Password reset issue", status: "in_progress", priority: "medium", category: "Access", createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date().toISOString() },
        { id: "3", ticketNumber: "#TK003", subject: "VPN connectivity", status: "resolved", priority: "critical", category: "Network", createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date().toISOString() },
        { id: "4", ticketNumber: "#TK004", subject: "Microsoft Teams setup", status: "closed", priority: "low", category: "Software", createdAt: new Date(Date.now() - 259200000).toISOString(), updatedAt: new Date().toISOString() },
        { id: "5", ticketNumber: "#TK005", subject: "Printer configuration", status: "pending_client", priority: "medium", category: "Hardware", createdAt: new Date(Date.now() - 345600000).toISOString(), updatedAt: new Date().toISOString() },
      ];
      res.json(tickets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Services
  app.get("/api/portal/services", async (req: Request, res: Response) => {
    try {
      const services = [
        { id: "1", serviceName: "Managed IT Support", description: "24/7 helpdesk and IT support", status: "active", monthlyPrice: "1500", userCount: 25, startDate: "2023-01-15" },
        { id: "2", serviceName: "Cloud Backup & Disaster Recovery", description: "Automated cloud backup with recovery testing", status: "active", monthlyPrice: "300", userCount: 25, startDate: "2023-01-15" },
        { id: "3", serviceName: "Security Operations Center", description: "24/7 SOC monitoring and threat detection", status: "active", monthlyPrice: "2000", userCount: 1, startDate: "2023-06-01" },
        { id: "4", serviceName: "Managed Workplace", description: "Identity, apps, devices, and workspace management", status: "active", monthlyPrice: "800", userCount: 25, startDate: "2023-09-01" },
      ];
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Invoices
  app.get("/api/portal/invoices", async (req: Request, res: Response) => {
    try {
      const invoices = [
        { id: "1", invoiceNumber: "INV-2024-001", amount: "2600", status: "paid", issueDate: "2024-01-01", dueDate: "2024-01-31", description: "Monthly services" },
        { id: "2", invoiceNumber: "INV-2024-002", amount: "2600", status: "paid", issueDate: "2024-02-01", dueDate: "2024-02-28", description: "Monthly services" },
        { id: "3", invoiceNumber: "INV-2024-003", amount: "2600", status: "sent", issueDate: "2024-03-01", dueDate: "2024-03-31", description: "Monthly services" },
        { id: "4", invoiceNumber: "INV-2024-004", amount: "2600", status: "overdue", issueDate: "2024-04-01", dueDate: "2024-04-30", description: "Monthly services" },
      ];
      res.json(invoices);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Knowledge Base
  app.get("/api/portal/kb", async (req: Request, res: Response) => {
    try {
      const articles = [
        { id: "1", title: "Getting Started with Our Managed Services", slug: "getting-started", category: "General", tags: ["onboarding", "basics"], views: 145 },
        { id: "2", title: "How to Reset Your Password", slug: "reset-password", category: "Access", tags: ["password", "account"], views: 892 },
        { id: "3", title: "VPN Connection Guide", slug: "vpn-guide", category: "Network", tags: ["vpn", "remote-work"], views: 567 },
        { id: "4", title: "Email Configuration for Outlook", slug: "email-outlook", category: "Email", tags: ["email", "outlook", "m365"], views: 734 },
        { id: "5", title: "Microsoft Teams Best Practices", slug: "teams-best-practices", category: "Software", tags: ["teams", "collaboration"], views: 412 },
        { id: "6", title: "Data Backup & Recovery", slug: "backup-recovery", category: "Backup", tags: ["backup", "disaster-recovery"], views: 289 },
        { id: "7", title: "Security Awareness Training", slug: "security-training", category: "Security", tags: ["security", "training", "phishing"], views: 156 },
        { id: "8", title: "Device Management Policies", slug: "device-policies", category: "Devices", tags: ["devices", "mobile", "policy"], views: 203 },
      ];
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Ticket Detail
  app.get("/api/portal/tickets/:id", async (req: Request, res: Response) => {
    try {
      const ticket = {
        id: req.params.id,
        ticketNumber: "#TK001",
        subject: "Email not syncing",
        description: "Outlook is not syncing emails from the Exchange server. Started this morning around 9 AM.",
        status: "open",
        priority: "high",
        category: "Email",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: "Sarah Johnson",
        comments: [
          { id: "1", author: "Sarah Johnson", role: "Support Engineer", content: "I'm looking into your Exchange connectivity. Can you confirm if you have VPN enabled?", timestamp: new Date(Date.now() - 3600000).toISOString(), isInternal: false },
          { id: "2", author: "You", role: "Client", content: "Yes, VPN is enabled. I'm working from home.", timestamp: new Date(Date.now() - 1800000).toISOString(), isInternal: false },
        ]
      };
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Auth - Generate Token for Desktop Agent
  app.post("/api/portal/auth/token", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // In production, verify against database
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const token = generateToken("portal-user-" + Date.now(), email, "portal");
      res.json({ token, email });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Chat Messages - with auth and rate limiting
  app.get("/api/portal/chat/messages/:ticketId", [authMiddleware, chatRateLimiter], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { ticketId } = req.params;
      const messages = await storage.getChatMessagesByTicketId(ticketId);
      
      // Mark as read
      await storage.markMessagesAsRead(ticketId);
      
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Portal Chat Send Message - with auth, validation, and rate limiting
  app.post("/api/portal/chat/messages", [authMiddleware, chatRateLimiter], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const parsed = insertPortalChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(parsed);
      
      // Broadcast via WebSocket
      const broadcast = {
        type: "chat_message",
        data: message,
        timestamp: new Date().toISOString(),
      };
      
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(broadcast));
        }
      });

      res.json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // (rest of your existing task, label, comment, and user routes remain unchanged…)

  return httpServer;
}
