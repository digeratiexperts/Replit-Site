import React, { useState } from "react";
import type { Board, Task } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

interface CalendarViewProps {
  projectId: string;
  boards: Board[];
  tasks: Task[];
  searchQuery: string;
}

const priorityColors = {
  low: "bg-slate-400",
  medium: "bg-blue-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

export function CalendarView({ projectId, boards, tasks, searchQuery }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const getTasksForDate = (day: number) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
      return taskDate === dateStr && task.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden">
        {dayNames.map((day) => (
          <div
            key={day}
            className="bg-slate-100 p-2 text-center text-sm font-semibold text-slate-600"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="bg-white p-2 min-h-[120px]" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayTasks = getTasksForDate(day);
          const isToday =
            new Date().toDateString() === new Date(year, month, day).toDateString();

          return (
            <Card
              key={day}
              className={`p-2 min-h-[120px] ${isToday ? "ring-2 ring-indigo-500" : ""} bg-white hover:shadow-md transition-shadow`}
            >
              <div className={`text-sm font-semibold mb-2 ${isToday ? "text-indigo-600" : "text-slate-900"}`}>
                {day}
              </div>
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="text-xs p-1 rounded bg-slate-50 truncate flex items-center gap-1"
                  >
                    <Circle
                      className={`w-2 h-2 fill-current ${priorityColors[task.priority || "medium"]}`}
                    />
                    <span className="truncate">{task.title}</span>
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-slate-400">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Overdue</h3>
          <p className="text-3xl font-bold text-red-500">
            {tasks.filter(
              (t) =>
                t.dueDate &&
                new Date(t.dueDate) < new Date() &&
                t.status !== "done"
            ).length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">This Month</h3>
          <p className="text-3xl font-bold text-blue-500">
            {tasks.filter((t) => {
              if (!t.dueDate) return false;
              const taskDate = new Date(t.dueDate);
              return (
                taskDate.getMonth() === month &&
                taskDate.getFullYear() === year
              );
            }).length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-500">
            {tasks.filter((t) => t.status === "done").length}
          </p>
        </Card>
      </div>
    </div>
  );
}
