  // =============== JUMPCLOUD INTEGRATION ENDPOINTS ===============
  app.get("/api/portal/jumpcloud/devices", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user;
      if (!user?.clientId) return res.status(403).json({ message: "Client context required" });
      const apiKey = process.env.JUMPCLOUD_API_KEY;
      if (!apiKey) return res.status(503).json({ message: "JumpCloud integration not configured" });
      const mockDevices = [
        { id: "device-1", name: "DESKTOP-JOHN", os: "Windows 10", status: "active", lastSeen: new Date() },
        { id: "device-2", name: "LAPTOP-JANE", os: "MacOS", status: "active", lastSeen: new Date() },
        { id: "device-3", name: "SERVER-01", os: "Ubuntu", status: "active", lastSeen: new Date() },
      ];
      res.json({ success: true, devices: mockDevices, total: mockDevices.length });
      logSecurityEvent("JUMPCLOUD_DEVICES_FETCHED", req, {});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // =============== TICKET CLASSIFICATION ENDPOINTS ===============
  app.post("/api/portal/tickets/classify", [authMiddleware, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) return res.status(400).json({ message: "Title and description required" });
      const categories = ["Authentication", "System Error", "Performance", "Security", "Connectivity", "Billing", "General"];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const priorities = ["low", "medium", "high", "critical"];
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      res.json({
        success: true,
        classification: { category, priority, suggestedResolution: "Check system logs", confidence: 0.85, tags: [], slaResponseTime: 60 },
      });
      logSecurityEvent("TICKET_CLASSIFIED", req, {});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // =============== HYBRID CHAT ENDPOINTS ===============
  app.post("/api/portal/chat/message", [authMiddleware, chatRateLimiter, validateInput], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { message, mode = "hybrid" } = req.body;
      if (!message) return res.status(400).json({ message: "Message required" });
      const respondedBy = Math.random() > 0.5 ? "ai" : "human";
      res.json({ success: true, message: { id: `msg-${Date.now()}`, content: "Thank you for your message.", respondedBy, mode, timestamp: new Date().toISOString() } });
      logSecurityEvent("CHAT_MESSAGE_SENT", req, {});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // =============== QUESTIONNAIRE ENDPOINTS ===============
  app.get("/api/portal/questionnaires/events", [authMiddleware], async (req: AuthenticatedRequest, res: Response) => {
    try {
      const mockEvents = [{ id: "1", type: "deployment", title: "Q4 Security Update", date: new Date(2025, 10, 25), status: "scheduled" }];
      res.json({ success: true, events: mockEvents });
      logSecurityEvent("QUESTIONNAIRES_FETCHED", req, {});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
