import { useState } from "react";
import { X, AlertCircle, Info, CheckCircle } from "lucide-react";

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "alert" | "info" | "success" | "maintenance";
  startDate: Date;
  endDate: Date;
}

interface AnnouncementBannerProps {
  announcement: Announcement;
  onDismiss?: (id: string) => void;
}

export function AnnouncementBanner({
  announcement,
  onDismiss,
}: AnnouncementBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const getStyle = (type: string) => {
    switch (type) {
      case "alert":
        return {
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-200 dark:border-red-800",
          icon: "text-red-600 dark:text-red-400",
          title: "text-red-800 dark:text-red-300",
          text: "text-red-700 dark:text-red-200",
        };
      case "success":
        return {
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          icon: "text-green-600 dark:text-green-400",
          title: "text-green-800 dark:text-green-300",
          text: "text-green-700 dark:text-green-200",
        };
      case "maintenance":
        return {
          bg: "bg-yellow-50 dark:bg-yellow-900/20",
          border: "border-yellow-200 dark:border-yellow-800",
          icon: "text-yellow-600 dark:text-yellow-400",
          title: "text-yellow-800 dark:text-yellow-300",
          text: "text-yellow-700 dark:text-yellow-200",
        };
      default:
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          icon: "text-blue-600 dark:text-blue-400",
          title: "text-blue-800 dark:text-blue-300",
          text: "text-blue-700 dark:text-blue-200",
        };
    }
  };

  const style = getStyle(announcement.type);

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className={`w-5 h-5 ${style.icon}`} />;
      case "success":
        return <CheckCircle className={`w-5 h-5 ${style.icon}`} />;
      default:
        return <Info className={`w-5 h-5 ${style.icon}`} />;
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.(announcement.id);
  };

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-lg p-4 mb-4`}
      data-testid={`announcement-${announcement.id}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {getIcon(announcement.type)}
          <div>
            <h3 className={`font-semibold ${style.title}`}>
              {announcement.title}
            </h3>
            <p className={`text-sm mt-1 ${style.text}`}>
              {announcement.message}
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className={`p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors`}
          aria-label="Dismiss announcement"
          data-testid={`button-dismiss-announcement-${announcement.id}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
