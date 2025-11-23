import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb, pgEnum, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high", "urgent"]);
export const taskStatusEnum = pgEnum("task_status", ["todo", "in_progress", "in_review", "done", "archived"]);
export const memberRoleEnum = pgEnum("member_role", ["owner", "admin", "member", "viewer"]);
export const viewTypeEnum = pgEnum("view_type", ["board", "list", "calendar", "timeline", "table"]);

// Portal enums
export const portalUserRoleEnum = pgEnum("portal_user_role", ["admin", "user", "viewer"]);
export const ticketStatusEnum = pgEnum("ticket_status", ["open", "in_progress", "pending_client", "resolved", "closed"]);
export const ticketPriorityEnum = pgEnum("ticket_priority", ["low", "medium", "high", "critical"]);
export const invoiceStatusEnum = pgEnum("invoice_status", ["draft", "sent", "paid", "overdue", "cancelled"]);

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  fullName: text("full_name"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Workspaces table
export const workspaces = pgTable("workspaces", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  ownerId: varchar("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Workspace members table
export const workspaceMembers = pgTable("workspace_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workspaceId: varchar("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: memberRoleEnum("role").notNull().default("member"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

// Projects table
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workspaceId: varchar("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  defaultView: viewTypeEnum("default_view").default("board"),
  isFavorite: boolean("is_favorite").default(false),
  isArchived: boolean("is_archived").default(false),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Boards/Lists table (columns within a project)
export const boards = pgTable("boards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color"),
  position: integer("position").notNull().default(0),
  isCollapsed: boolean("is_collapsed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Labels table
export const labels = pgTable("labels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workspaceId: varchar("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  boardId: varchar("board_id").references(() => boards.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  description: text("description"),
  status: taskStatusEnum("status").notNull().default("todo"),
  priority: taskPriorityEnum("priority").default("medium"),
  position: integer("position").notNull().default(0),
  dueDate: timestamp("due_date"),
  startDate: timestamp("start_date"),
  estimatedHours: integer("estimated_hours"),
  actualHours: integer("actual_hours"),
  assigneeId: varchar("assignee_id").references(() => users.id, { onDelete: "set null" }),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  parentTaskId: varchar("parent_task_id").references(() => tasks.id, { onDelete: "set null" }),
  isArchived: boolean("is_archived").default(false),
  customFields: jsonb("custom_fields"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Task labels (many-to-many)
export const taskLabels = pgTable("task_labels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  taskId: varchar("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
  labelId: varchar("label_id").notNull().references(() => labels.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Comments table
export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  taskId: varchar("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Attachments table
export const attachments = pgTable("attachments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  taskId: varchar("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  uploadedBy: varchar("uploaded_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Activity/Audit log table
export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workspaceId: varchar("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: "cascade" }),
  taskId: varchar("task_id").references(() => tasks.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id),
  action: text("action").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// =============== PORTAL TABLES ===============

// Portal clients table
export const portalClients = pgTable("portal_clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  website: text("website"),
  industry: text("industry"),
  employeeCount: integer("employee_count"),
  primaryContact: text("primary_contact"),
  accountManager: text("account_manager"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Portal users table
export const portalUsers = pgTable("portal_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => portalClients.id, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: portalUserRoleEnum("role").default("user"),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Portal services table
export const portalServices = pgTable("portal_services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => portalClients.id, { onDelete: "cascade" }),
  serviceName: text("service_name").notNull(),
  description: text("description"),
  status: text("status").default("active"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }),
  userCount: integer("user_count"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Portal support tickets table
export const portalTickets = pgTable("portal_tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => portalClients.id, { onDelete: "cascade" }),
  ticketNumber: text("ticket_number").unique().notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  status: ticketStatusEnum("status").default("open"),
  priority: ticketPriorityEnum("priority").default("medium"),
  category: text("category"),
  assignedTo: text("assigned_to"),
  createdBy: varchar("created_by").notNull().references(() => portalUsers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

// Portal ticket comments table
export const portalTicketComments = pgTable("portal_ticket_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketId: varchar("ticket_id").notNull().references(() => portalTickets.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => portalUsers.id),
  content: text("content").notNull(),
  isInternal: boolean("is_internal").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Portal invoices table
export const portalInvoices = pgTable("portal_invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => portalClients.id, { onDelete: "cascade" }),
  invoiceNumber: text("invoice_number").unique().notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: invoiceStatusEnum("status").default("draft"),
  issueDate: timestamp("issue_date"),
  dueDate: timestamp("due_date"),
  paidDate: timestamp("paid_date"),
  description: text("description"),
  lineItems: jsonb("line_items"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Portal knowledge base articles table
export const portalKBArticles = pgTable("portal_kb_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  content: text("content").notNull(),
  category: text("category"),
  tags: text("tags").array(),
  views: integer("views").default(0),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  ownedWorkspaces: many(workspaces),
  workspaceMembers: many(workspaceMembers),
  createdProjects: many(projects),
  assignedTasks: many(tasks, { relationName: "assignedTasks" }),
  createdTasks: many(tasks, { relationName: "createdTasks" }),
  comments: many(comments),
  attachments: many(attachments),
  activities: many(activities),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [workspaces.ownerId],
    references: [users.id],
  }),
  members: many(workspaceMembers),
  projects: many(projects),
  labels: many(labels),
  activities: many(activities),
}));

export const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [workspaceMembers.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [workspaceMembers.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [projects.workspaceId],
    references: [workspaces.id],
  }),
  creator: one(users, {
    fields: [projects.createdBy],
    references: [users.id],
  }),
  boards: many(boards),
  tasks: many(tasks),
  activities: many(activities),
}));

export const boardsRelations = relations(boards, ({ one, many }) => ({
  project: one(projects, {
    fields: [boards.projectId],
    references: [projects.id],
  }),
  tasks: many(tasks),
}));

export const labelsRelations = relations(labels, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [labels.workspaceId],
    references: [workspaces.id],
  }),
  taskLabels: many(taskLabels),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  board: one(boards, {
    fields: [tasks.boardId],
    references: [boards.id],
  }),
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
    relationName: "assignedTasks",
  }),
  creator: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
    relationName: "createdTasks",
  }),
  parentTask: one(tasks, {
    fields: [tasks.parentTaskId],
    references: [tasks.id],
    relationName: "subtasks",
  }) as any,
  subtasks: many(tasks, { relationName: "subtasks" }) as any,
  labels: many(taskLabels),
  comments: many(comments),
  attachments: many(attachments),
  activities: many(activities),
}));

export const taskLabelsRelations = relations(taskLabels, ({ one }) => ({
  task: one(tasks, {
    fields: [taskLabels.taskId],
    references: [tasks.id],
  }),
  label: one(labels, {
    fields: [taskLabels.labelId],
    references: [labels.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  task: one(tasks, {
    fields: [comments.taskId],
    references: [tasks.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  task: one(tasks, {
    fields: [attachments.taskId],
    references: [tasks.id],
  }),
  uploader: one(users, {
    fields: [attachments.uploadedBy],
    references: [users.id],
  }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [activities.workspaceId],
    references: [workspaces.id],
  }),
  project: one(projects, {
    fields: [activities.projectId],
    references: [projects.id],
  }),
  task: one(tasks, {
    fields: [activities.taskId],
    references: [tasks.id],
  }),
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));

// Portal relations
export const portalClientsRelations = relations(portalClients, ({ many }) => ({
  portalUsers: many(portalUsers),
  services: many(portalServices),
  tickets: many(portalTickets),
  invoices: many(portalInvoices),
}));

export const portalUsersRelations = relations(portalUsers, ({ one, many }) => ({
  client: one(portalClients, {
    fields: [portalUsers.clientId],
    references: [portalClients.id],
  }),
  ticketComments: many(portalTicketComments),
}));

export const portalServicesRelations = relations(portalServices, ({ one }) => ({
  client: one(portalClients, {
    fields: [portalServices.clientId],
    references: [portalClients.id],
  }),
}));

export const portalTicketsRelations = relations(portalTickets, ({ one, many }) => ({
  client: one(portalClients, {
    fields: [portalTickets.clientId],
    references: [portalClients.id],
  }),
  createdBy: one(portalUsers, {
    fields: [portalTickets.createdBy],
    references: [portalUsers.id],
  }),
  comments: many(portalTicketComments),
}));

export const portalTicketCommentsRelations = relations(portalTicketComments, ({ one }) => ({
  ticket: one(portalTickets, {
    fields: [portalTicketComments.ticketId],
    references: [portalTickets.id],
  }),
  user: one(portalUsers, {
    fields: [portalTicketComments.userId],
    references: [portalUsers.id],
  }),
}));

export const portalInvoicesRelations = relations(portalInvoices, ({ one }) => ({
  client: one(portalClients, {
    fields: [portalInvoices.clientId],
    references: [portalClients.id],
  }),
}));

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  avatar: true,
});

export const selectUserSchema = createSelectSchema(users);

export const insertWorkspaceSchema = createInsertSchema(workspaces).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBoardSchema = createInsertSchema(boards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
});

export const updateTaskSchema = insertTaskSchema.partial();

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLabelSchema = createInsertSchema(labels).omit({
  id: true,
});

// Portal Zod schemas
export const insertPortalUserSchema = createInsertSchema(portalUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
});

export const insertPortalTicketSchema = createInsertSchema(portalTickets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  resolvedAt: true,
  ticketNumber: true,
});

export const insertPortalTicketCommentSchema = createInsertSchema(portalTicketComments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// TypeScript types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Workspace = typeof workspaces.$inferSelect;
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;

export type WorkspaceMember = typeof workspaceMembers.$inferSelect;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Board = typeof boards.$inferSelect;
export type InsertBoard = z.infer<typeof insertBoardSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;

export type Label = typeof labels.$inferSelect;
export type InsertLabel = z.infer<typeof insertLabelSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

export type Attachment = typeof attachments.$inferSelect;

export type Activity = typeof activities.$inferSelect;

// Portal types
export type PortalClient = typeof portalClients.$inferSelect;
export type PortalUser = typeof portalUsers.$inferSelect;
export type InsertPortalUser = z.infer<typeof insertPortalUserSchema>;

export type PortalService = typeof portalServices.$inferSelect;
export type PortalTicket = typeof portalTickets.$inferSelect;
export type InsertPortalTicket = z.infer<typeof insertPortalTicketSchema>;

export type PortalTicketComment = typeof portalTicketComments.$inferSelect;
export type InsertPortalTicketComment = z.infer<typeof insertPortalTicketCommentSchema>;

export type PortalInvoice = typeof portalInvoices.$inferSelect;
export type PortalKBArticle = typeof portalKBArticles.$inferSelect;

// Chat messages table
export const portalChatMessages = pgTable("portal_chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketId: varchar("ticket_id").references(() => portalTickets.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => portalUsers.id, { onDelete: "cascade" }),
  senderName: text("sender_name").notNull(),
  senderRole: text("sender_role").notNull(), // "client" or "support"
  content: text("content").notNull(),
  encryptedContent: text("encrypted_content"), // For encryption at rest
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// AI Classification table - stores AI-determined ticket metadata
export const portalTicketAIClassifications = pgTable("portal_ticket_ai_classifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketId: varchar("ticket_id").notNull().references(() => portalTickets.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  suggestedPriority: text("suggested_priority"),
  suggestedDepartment: text("suggested_department"),
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  appliedAt: timestamp("applied_at"),
  isApplied: boolean("is_applied").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// AI Suggestions table - stores AI-generated recommendations
export const portalAISuggestions = pgTable("portal_ai_suggestions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketId: varchar("ticket_id").notNull().references(() => portalTickets.id, { onDelete: "cascade" }),
  suggestionType: text("suggestion_type").notNull(), // "resolution", "escalation", "info", "action"
  content: text("content").notNull(),
  source: text("source"), // where suggestion comes from
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  wasUseful: boolean("was_useful"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Shipments table - for Ship Center
export const portalShipments = pgTable("portal_shipments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => portalClients.id, { onDelete: "cascade" }),
  shipmentNumber: text("shipment_number").unique().notNull(),
  status: text("status").default("pending"), // pending, processing, shipped, in_transit, delivered
  itemCount: integer("item_count"),
  trackingNumber: text("tracking_number"),
  estimatedDelivery: timestamp("estimated_delivery"),
  deliveredAt: timestamp("delivered_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Procurement Products table - products from internal and partners
export const portalProcurementProducts = pgTable("portal_procurement_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  price: decimal("price", { precision: 10, scale: 2 }),
  source: text("source").default("internal"), // "internal", "griffin-it", "sherweb", "pax8", "climbcs"
  externalUrl: text("external_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPortalChatMessageSchema = createInsertSchema(portalChatMessages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  encryptedContent: true,
});

// External Integration Sync Tables
export const externalIntegrationMappings = pgTable("external_integration_mappings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => portalClients.id, { onDelete: "cascade" }),
  integrationType: text("integration_type").notNull(), // "zoho_desk", "zoho_crm", "jumpcloud", "seamless_ai"
  externalId: text("external_id").notNull(), // ID from external system
  externalType: text("external_type"), // "company", "user", "contact"
  mappedPortalId: varchar("mapped_portal_id"), // ID of mapped portalUser or portalClient
  mappedType: text("mapped_type"), // "user" or "client"
  syncStatus: text("sync_status").default("active"), // active, archived, deleted
  lastSyncedAt: timestamp("last_synced_at"),
  externalData: jsonb("external_data"), // Store original external data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Desktop Agents (JumpCloud, Coro.net, BlackPoint, etc.)
export const desktopAgents = pgTable("desktop_agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => portalClients.id, { onDelete: "cascade" }),
  agentName: text("agent_name").notNull(), // "Digerati", "JumpCloud", "Coro", "BlackPoint"
  agentType: text("agent_type").notNull(), // "jumpcloud", "coro", "blackpoint", "other"
  downloadUrl: text("download_url"),
  version: text("version"),
  description: text("description"),
  features: text("features").array(), // Array of feature descriptions
  systemRequirements: jsonb("system_requirements"), // OS, RAM, disk, etc.
  supportedOSes: text("supported_oses").array(), // Windows, Mac, Linux
  installationGuide: text("installation_guide"),
  isActive: boolean("is_active").default(true),
  uploadedBy: varchar("uploaded_by").notNull().references(() => portalUsers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Integration Sync Logs
export const integrationSyncLogs = pgTable("integration_sync_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => portalClients.id, { onDelete: "set null" }),
  integrationType: text("integration_type").notNull(),
  syncType: text("sync_type"), // "import", "update", "delete"
  totalRecords: integer("total_records"),
  successCount: integer("success_count"),
  failureCount: integer("failure_count"),
  status: text("status"), // "in_progress", "completed", "failed"
  errorMessage: text("error_message"),
  syncDetails: jsonb("sync_details"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PortalChatMessage = typeof portalChatMessages.$inferSelect;
export type InsertPortalChatMessage = z.infer<typeof insertPortalChatMessageSchema>;

export type PortalTicketAIClassification = typeof portalTicketAIClassifications.$inferSelect;
export type PortalAISuggestion = typeof portalAISuggestions.$inferSelect;
export type PortalShipment = typeof portalShipments.$inferSelect;
export type PortalProcurementProduct = typeof portalProcurementProducts.$inferSelect;

export type ExternalIntegrationMapping = typeof externalIntegrationMappings.$inferSelect;
export type DesktopAgent = typeof desktopAgents.$inferSelect;
export type IntegrationSyncLog = typeof integrationSyncLogs.$inferSelect;
