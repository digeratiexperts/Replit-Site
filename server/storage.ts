import {
  users,
  workspaces,
  projects,
  boards,
  tasks,
  labels,
  comments,
  attachments,
  workspaceMembers,
  taskLabels,
  activities,
  portalChatMessages,
  type User,
  type InsertUser,
  type Workspace,
  type InsertWorkspace,
  type Project,
  type InsertProject,
  type Board,
  type InsertBoard,
  type Task,
  type InsertTask,
  type UpdateTask,
  type Label,
  type InsertLabel,
  type Comment,
  type InsertComment,
  type PortalChatMessage,
  type InsertPortalChatMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Workspace operations
  getWorkspace(id: string): Promise<Workspace | undefined>;
  getWorkspacesByUserId(userId: string): Promise<Workspace[]>;
  createWorkspace(workspace: InsertWorkspace): Promise<Workspace>;
  updateWorkspace(id: string, data: Partial<InsertWorkspace>): Promise<Workspace | undefined>;
  deleteWorkspace(id: string): Promise<void>;

  // Project operations
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByWorkspaceId(workspaceId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<void>;

  // Board operations
  getBoard(id: string): Promise<Board | undefined>;
  getBoardsByProjectId(projectId: string): Promise<Board[]>;
  createBoard(board: InsertBoard): Promise<Board>;
  updateBoard(id: string, data: Partial<InsertBoard>): Promise<Board | undefined>;
  deleteBoard(id: string): Promise<void>;

  // Task operations
  getTask(id: string): Promise<Task | undefined>;
  getTasksByProjectId(projectId: string): Promise<Task[]>;
  getTasksByBoardId(boardId: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, data: UpdateTask): Promise<Task | undefined>;
  deleteTask(id: string): Promise<void>;

  // Label operations
  getLabel(id: string): Promise<Label | undefined>;
  getLabelsByWorkspaceId(workspaceId: string): Promise<Label[]>;
  createLabel(label: InsertLabel): Promise<Label>;
  deleteLabel(id: string): Promise<void>;

  // Comment operations
  getCommentsByTaskId(taskId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: string): Promise<void>;

  // Portal Chat operations
  getChatMessagesByTicketId(ticketId: string): Promise<PortalChatMessage[]>;
  createChatMessage(message: InsertPortalChatMessage): Promise<PortalChatMessage>;
  markMessagesAsRead(ticketId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Workspace operations
  async getWorkspace(id: string): Promise<Workspace | undefined> {
    const [workspace] = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, id));
    return workspace || undefined;
  }

  async getWorkspacesByUserId(userId: string): Promise<Workspace[]> {
    const ownedWorkspaces = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.ownerId, userId));
    
    const memberWorkspaces = await db
      .select({
        id: workspaces.id,
        name: workspaces.name,
        description: workspaces.description,
        icon: workspaces.icon,
        color: workspaces.color,
        ownerId: workspaces.ownerId,
        createdAt: workspaces.createdAt,
        updatedAt: workspaces.updatedAt,
      })
      .from(workspaceMembers)
      .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
      .where(eq(workspaceMembers.userId, userId));
    
    const allWorkspaces = [...ownedWorkspaces, ...memberWorkspaces];
    const uniqueWorkspaces = Array.from(
      new Map(allWorkspaces.map(w => [w.id, w])).values()
    );
    
    return uniqueWorkspaces.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createWorkspace(workspace: InsertWorkspace): Promise<Workspace> {
    const [created] = await db
      .insert(workspaces)
      .values(workspace)
      .returning();
    return created;
  }

  async updateWorkspace(
    id: string,
    data: Partial<InsertWorkspace>
  ): Promise<Workspace | undefined> {
    const [updated] = await db
      .update(workspaces)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(workspaces.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteWorkspace(id: string): Promise<void> {
    await db.delete(workspaces).where(eq(workspaces.id, id));
  }

  // Project operations
  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectsByWorkspaceId(workspaceId: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.workspaceId, workspaceId))
      .orderBy(desc(projects.isFavorite), desc(projects.createdAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }

  async updateProject(
    id: string,
    data: Partial<InsertProject>
  ): Promise<Project | undefined> {
    const [updated] = await db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Board operations
  async getBoard(id: string): Promise<Board | undefined> {
    const [board] = await db.select().from(boards).where(eq(boards.id, id));
    return board || undefined;
  }

  async getBoardsByProjectId(projectId: string): Promise<Board[]> {
    return await db
      .select()
      .from(boards)
      .where(eq(boards.projectId, projectId))
      .orderBy(asc(boards.position));
  }

  async createBoard(board: InsertBoard): Promise<Board> {
    const [created] = await db.insert(boards).values(board).returning();
    return created;
  }

  async updateBoard(
    id: string,
    data: Partial<InsertBoard>
  ): Promise<Board | undefined> {
    const [updated] = await db
      .update(boards)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(boards.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteBoard(id: string): Promise<void> {
    await db.delete(boards).where(eq(boards.id, id));
  }

  // Task operations
  async getTask(id: string): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task || undefined;
  }

  async getTasksByProjectId(projectId: string): Promise<Task[]> {
    return await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.projectId, projectId), eq(tasks.isArchived, false)))
      .orderBy(asc(tasks.position), desc(tasks.createdAt));
  }

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.boardId, boardId), eq(tasks.isArchived, false)))
      .orderBy(asc(tasks.position));
  }

  async createTask(task: InsertTask): Promise<Task> {
    const [created] = await db.insert(tasks).values(task).returning();
    return created;
  }

  async updateTask(id: string, data: UpdateTask): Promise<Task | undefined> {
    const updateData: any = { ...data, updatedAt: new Date() };
    
    if (data.status === "done") {
      updateData.completedAt = new Date();
    } else if (data.status && data.status !== "done") {
      updateData.completedAt = null;
    }

    const [updated] = await db
      .update(tasks)
      .set(updateData)
      .where(eq(tasks.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteTask(id: string): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, id));
  }

  // Label operations
  async getLabel(id: string): Promise<Label | undefined> {
    const [label] = await db.select().from(labels).where(eq(labels.id, id));
    return label || undefined;
  }

  async getLabelsByWorkspaceId(workspaceId: string): Promise<Label[]> {
    return await db
      .select()
      .from(labels)
      .where(eq(labels.workspaceId, workspaceId))
      .orderBy(asc(labels.name));
  }

  async createLabel(label: InsertLabel): Promise<Label> {
    const [created] = await db.insert(labels).values(label).returning();
    return created;
  }

  async deleteLabel(id: string): Promise<void> {
    await db.delete(labels).where(eq(labels.id, id));
  }

  // Comment operations
  async getCommentsByTaskId(taskId: string): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.taskId, taskId))
      .orderBy(desc(comments.createdAt));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [created] = await db.insert(comments).values(comment).returning();
    return created;
  }

  async deleteComment(id: string): Promise<void> {
    await db.delete(comments).where(eq(comments.id, id));
  }

  // Portal Chat operations
  async getChatMessagesByTicketId(ticketId: string): Promise<PortalChatMessage[]> {
    return await db
      .select()
      .from(portalChatMessages)
      .where(eq(portalChatMessages.ticketId, ticketId))
      .orderBy(asc(portalChatMessages.createdAt));
  }

  async createChatMessage(message: InsertPortalChatMessage): Promise<PortalChatMessage> {
    const [created] = await db.insert(portalChatMessages).values(message).returning();
    return created;
  }

  async markMessagesAsRead(ticketId: string): Promise<void> {
    await db
      .update(portalChatMessages)
      .set({ isRead: true })
      .where(eq(portalChatMessages.ticketId, ticketId));
  }
}

export const storage = new DatabaseStorage();
