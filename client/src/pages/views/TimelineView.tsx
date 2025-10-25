import React from "react";
import type { Board, Task } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface TimelineViewProps {
  projectId: string;
  boards: Board[];
  tasks: Task[];
  searchQuery: string;
}

export function TimelineView({ projectId, boards, tasks, searchQuery }: TimelineViewProps) {
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((task) => task.startDate || task.dueDate)
    .sort((a, b) => {
      const dateA = new Date(a.startDate || a.createdAt);
      const dateB = new Date(b.startDate || b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });

  const getDatePosition = (task: Task) => {
    if (!task.startDate && !task.dueDate) return { left: 0, width: 0 };

    const projectStart = new Date(
      Math.min(
        ...tasks
          .filter((t) => t.startDate || t.dueDate)
          .map((t) => new Date(t.startDate || t.createdAt).getTime())
      )
    );

    const projectEnd = new Date(
      Math.max(
        ...tasks
          .filter((t) => t.dueDate)
          .map((t) => new Date(t.dueDate!).getTime())
      )
    );

    const totalDays =
      (projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24);

    const taskStart = new Date(task.startDate || task.createdAt);
    const taskEnd = new Date(task.dueDate || taskStart);

    const startOffset =
      ((taskStart.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)) /
      totalDays;
    const duration =
      ((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) /
      totalDays;

    return {
      left: `${startOffset * 100}%`,
      width: `${Math.max(duration * 100, 5)}%`,
    };
  };

  const priorityColors = {
    low: "bg-slate-400",
    medium: "bg-blue-500",
    high: "bg-orange-500",
    urgent: "bg-red-500",
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <div className="text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            {searchQuery
              ? `No tasks with dates found matching "${searchQuery}"`
              : "No tasks with dates yet. Add due dates to see the timeline."}
          </p>
        </div>
      </div>
    );
  }

  const groupedByBoard = boards.reduce((acc, board) => {
    acc[board.id] = filteredTasks.filter((task) => task.boardId === board.id);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{filteredTasks.length} tasks with dates</span>
        </div>
      </div>

      {boards.map((board) => {
        const boardTasks = groupedByBoard[board.id] || [];
        
        if (boardTasks.length === 0) return null;

        return (
          <div key={board.id} className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-lg text-slate-900">{board.name}</h3>
              <Badge variant="secondary">{boardTasks.length}</Badge>
            </div>

            <div className="space-y-2">
              {boardTasks.map((task) => {
                const position = getDatePosition(task);
                const duration = task.startDate && task.dueDate
                  ? Math.ceil(
                      (new Date(task.dueDate).getTime() -
                        new Date(task.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                  : 0;

                return (
                  <div key={task.id} className="relative">
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-sm font-medium w-64 truncate">
                        {task.title}
                      </span>
                    </div>
                    <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                      <div
                        className={`absolute h-full ${
                          priorityColors[task.priority || "medium"]
                        } rounded-lg flex items-center px-3 text-white text-xs font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                        style={{
                          left: position.left,
                          width: position.width,
                        }}
                      >
                        <span className="truncate">
                          {task.startDate &&
                            new Date(task.startDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          {task.startDate && task.dueDate && " → "}
                          {task.dueDate &&
                            new Date(task.dueDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          {duration > 0 && ` (${duration}d)`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
