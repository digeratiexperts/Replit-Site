import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

interface UseFocusTrapOptions {
  enabled?: boolean;
  returnFocusOnDeactivate?: boolean;
  initialFocus?: HTMLElement | null;
}

export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  options: UseFocusTrapOptions = {}
) {
  const { 
    enabled = true, 
    returnFocusOnDeactivate = true,
    initialFocus = null 
  } = options;
  
  const containerRef = useRef<T>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    ).filter(el => el.offsetParent !== null);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      if (activeElement === firstElement || !containerRef.current?.contains(activeElement)) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (activeElement === lastElement || !containerRef.current?.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, [enabled, getFocusableElements]);

  useEffect(() => {
    if (!enabled) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    
    const focusTarget = initialFocus || getFocusableElements()[0];
    if (focusTarget) {
      requestAnimationFrame(() => focusTarget.focus());
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      if (returnFocusOnDeactivate && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, handleKeyDown, getFocusableElements, initialFocus, returnFocusOnDeactivate]);

  return containerRef;
}

export function useEscapeKey(callback: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callback, enabled]);
}

export function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  enabled = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback, enabled]);

  return ref;
}
