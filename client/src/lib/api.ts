import type {
  Workspace,
  InsertWorkspace,
  Project,
  InsertProject,
  Board,
  InsertBoard,
  Task,
  InsertTask,
  UpdateTask,
  Label,
  InsertLabel,
  Comment,
  InsertComment,
} from "@shared/schema";

const API_BASE = "/api";

export const api = {
  workspaces: {
    list: (userId: string) =>
      fetch(`${API_BASE}/workspaces?userId=${userId}`).then((r) => r.json()),
    get: (id: string) =>
      fetch(`${API_BASE}/workspaces/${id}`).then((r) => r.json()),
    create: (data: InsertWorkspace) =>
      fetch(`${API_BASE}/workspaces`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    update: (id: string, data: Partial<InsertWorkspace>) =>
      fetch(`${API_BASE}/workspaces/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    delete: (id: string) =>
      fetch(`${API_BASE}/workspaces/${id}`, { method: "DELETE" }),
  },
  projects: {
    list: (workspaceId: string) =>
      fetch(`${API_BASE}/projects?workspaceId=${workspaceId}`).then((r) =>
        r.json()
      ),
    get: (id: string) =>
      fetch(`${API_BASE}/projects/${id}`).then((r) => r.json()),
    create: (data: InsertProject) =>
      fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    update: (id: string, data: Partial<InsertProject>) =>
      fetch(`${API_BASE}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    delete: (id: string) =>
      fetch(`${API_BASE}/projects/${id}`, { method: "DELETE" }),
  },
  boards: {
    list: (projectId: string) =>
      fetch(`${API_BASE}/boards?projectId=${projectId}`).then((r) => r.json()),
    create: (data: InsertBoard) =>
      fetch(`${API_BASE}/boards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    update: (id: string, data: Partial<InsertBoard>) =>
      fetch(`${API_BASE}/boards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    delete: (id: string) =>
      fetch(`${API_BASE}/boards/${id}`, { method: "DELETE" }),
  },
  tasks: {
    listByProject: (projectId: string) =>
      fetch(`${API_BASE}/tasks?projectId=${projectId}`).then((r) => r.json()),
    listByBoard: (boardId: string) =>
      fetch(`${API_BASE}/tasks?boardId=${boardId}`).then((r) => r.json()),
    get: (id: string) => fetch(`${API_BASE}/tasks/${id}`).then((r) => r.json()),
    create: (data: InsertTask) =>
      fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    update: (id: string, data: UpdateTask) =>
      fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    delete: (id: string) =>
      fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" }),
  },
  labels: {
    list: (workspaceId: string) =>
      fetch(`${API_BASE}/labels?workspaceId=${workspaceId}`).then((r) =>
        r.json()
      ),
    create: (data: InsertLabel) =>
      fetch(`${API_BASE}/labels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    delete: (id: string) =>
      fetch(`${API_BASE}/labels/${id}`, { method: "DELETE" }),
  },
  comments: {
    list: (taskId: string) =>
      fetch(`${API_BASE}/comments?taskId=${taskId}`).then((r) => r.json()),
    create: (data: InsertComment) =>
      fetch(`${API_BASE}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    delete: (id: string) =>
      fetch(`${API_BASE}/comments/${id}`, { method: "DELETE" }),
  },
  users: {
    create: (data: { username: string; password: string; email?: string }) =>
      fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    get: (id: string) => fetch(`${API_BASE}/users/${id}`).then((r) => r.json()),
  },
};
