import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useWebSocket } from "@/lib/websocket";
import type { Workspace, Project, Board, Task } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  List,
  Calendar,
  GanttChart,
  Table2,
  Plus,
  Settings,
  Search,
  ChevronDown,
  Star,
  Folder,
  MoreHorizontal,
} from "lucide-react";
import { KanbanView } from "./views/KanbanView";
import { ListView } from "./views/ListView";
import { CalendarView } from "./views/CalendarView";
import { TimelineView } from "./views/TimelineView";
import { TableView } from "./views/TableView";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";

type ViewType = "board" | "list" | "calendar" | "timeline" | "table";

export function Dashboard() {
  const { user, logout } = useAuth();
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(
    null
  );
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [isWorkspaceDialogOpen, setIsWorkspaceDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: workspaces = [] } = useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: () => api.workspaces.list(user?.id || "demo-user"),
    enabled: !!user,
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects", currentWorkspaceId],
    queryFn: () =>
      currentWorkspaceId ? api.projects.list(currentWorkspaceId) : [],
    enabled: !!currentWorkspaceId,
  });

  const { data: boards = [] } = useQuery<Board[]>({
    queryKey: ["boards", currentProjectId],
    queryFn: () =>
      currentProjectId ? api.boards.list(currentProjectId) : [],
    enabled: !!currentProjectId,
  });

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["tasks", currentProjectId],
    queryFn: () =>
      currentProjectId ? api.tasks.listByProject(currentProjectId) : [],
    enabled: !!currentProjectId,
  });

  const createWorkspaceMutation = useMutation({
    mutationFn: (name: string) =>
      api.workspaces.create({
        name,
        ownerId: user?.id || "demo-user",
        color: "#6366f1",
      }),
    onSuccess: (newWorkspace) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      setCurrentWorkspaceId(newWorkspace.id);
      setNewWorkspaceName("");
      setIsWorkspaceDialogOpen(false);
      sendMessage({ type: "workspace_created", workspace: newWorkspace });
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: (name: string) =>
      api.projects.create({
        name,
        workspaceId: currentWorkspaceId!,
        createdBy: user?.id || "demo-user",
        color: "#8b5cf6",
        defaultView: "board",
      }),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setCurrentProjectId(newProject.id);
      setNewProjectName("");
      setIsProjectDialogOpen(false);
      sendMessage({ type: "project_created", project: newProject });
    },
  });

  const { sendMessage } = useWebSocket((data) => {
    if (data.type === "task_created" || data.type === "task_updated" || data.type === "task_deleted") {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
    if (data.type === "board_created" || data.type === "board_updated" || data.type === "board_deleted") {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    }
    if (data.type === "project_created" || data.type === "project_updated") {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });

  useEffect(() => {
    if (workspaces.length > 0 && !currentWorkspaceId) {
      setCurrentWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, currentWorkspaceId]);

  useEffect(() => {
    if (projects.length > 0 && !currentProjectId) {
      setCurrentProjectId(projects[0].id);
    }
  }, [projects, currentProjectId]);

  const currentWorkspace = workspaces.find((w) => w.id === currentWorkspaceId);
  const currentProject = projects.find((p) => p.id === currentProjectId);

  const renderView = () => {
    const props = {
      projectId: currentProjectId!,
      boards,
      tasks,
      searchQuery,
    };

    switch (currentView) {
      case "board":
        return <KanbanView {...props} />;
      case "list":
        return <ListView {...props} />;
      case "calendar":
        return <CalendarView {...props} />;
      case "timeline":
        return <TimelineView {...props} />;
      case "table":
        return <TableView {...props} />;
      default:
        return <KanbanView {...props} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.fullName || user?.username}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Dialog
            open={isWorkspaceDialogOpen}
            onOpenChange={setIsWorkspaceDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {currentWorkspace?.name || "Select Workspace"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Workspace</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Workspace Name</Label>
                  <Input
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    placeholder="e.g., My Team"
                  />
                </div>
                <Button
                  onClick={() => createWorkspaceMutation.mutate(newWorkspaceName)}
                  disabled={!newWorkspaceName}
                  className="w-full"
                >
                  Create Workspace
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-slate-600">Projects</h2>
            <Dialog
              open={isProjectDialogOpen}
              onOpenChange={setIsProjectDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  disabled={!currentWorkspaceId}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Project Name</Label>
                    <Input
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="e.g., Website Redesign"
                    />
                  </div>
                  <Button
                    onClick={() => createProjectMutation.mutate(newProjectName)}
                    disabled={!newProjectName}
                    className="w-full"
                  >
                    Create Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setCurrentProjectId(project.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentProjectId === project.id
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Folder className="w-4 h-4" />
                <span className="flex-1 text-left truncate">{project.name}</span>
                {project.isFavorite && <Star className="w-3 h-3 fill-current" />}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentProject?.name || "Select a project"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {tasks.length} tasks • {boards.length} boards
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="default" className="gap-2">
                <Plus className="w-4 h-4" />
                New Task
              </Button>
            </div>
          </div>

          <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as ViewType)}>
            <TabsList>
              <TabsTrigger value="board" className="gap-2">
                <LayoutGrid className="w-4 h-4" />
                Board
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-2">
                <List className="w-4 h-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="calendar" className="gap-2">
                <Calendar className="w-4 h-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <GanttChart className="w-4 h-4" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="table" className="gap-2">
                <Table2 className="w-4 h-4" />
                Table
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {currentProjectId ? (
            renderView()
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              <div className="text-center">
                <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select or create a project to get started</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
