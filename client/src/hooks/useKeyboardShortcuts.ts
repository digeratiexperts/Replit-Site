import { useEffect, useCallback } from "react";

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description?: string;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

      if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
        const target = event.target as HTMLElement;
        const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
        
        if (!isInput) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};

export const useGlobalShortcuts = () => {
  useKeyboardShortcuts([
    {
      key: "Home",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      description: "Scroll to top"
    },
    {
      key: "End",
      action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
      description: "Scroll to bottom"
    },
    {
      key: "/",
      action: () => {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      },
      description: "Focus search"
    }
  ]);
};

export default useKeyboardShortcuts;
