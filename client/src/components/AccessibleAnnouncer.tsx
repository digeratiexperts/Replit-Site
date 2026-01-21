import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type AnnouncementPoliteness = "polite" | "assertive";

interface AnnouncerContextValue {
  announce: (message: string, politeness?: AnnouncementPoliteness) => void;
}

const AnnouncerContext = createContext<AnnouncerContextValue | null>(null);

export function useAnnouncer() {
  const context = useContext(AnnouncerContext);
  if (!context) {
    throw new Error("useAnnouncer must be used within an AnnouncerProvider");
  }
  return context;
}

interface AnnouncerProviderProps {
  children: ReactNode;
}

export function AnnouncerProvider({ children }: AnnouncerProviderProps) {
  const [politeMessage, setPoliteMessage] = useState("");
  const [assertiveMessage, setAssertiveMessage] = useState("");

  const announce = useCallback((message: string, politeness: AnnouncementPoliteness = "polite") => {
    if (politeness === "assertive") {
      setAssertiveMessage("");
      requestAnimationFrame(() => setAssertiveMessage(message));
    } else {
      setPoliteMessage("");
      requestAnimationFrame(() => setPoliteMessage(message));
    }
  }, []);

  return (
    <AnnouncerContext.Provider value={{ announce }}>
      {children}
      
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessage}
      </div>
      
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
    </AnnouncerContext.Provider>
  );
}
