import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { analytics } from "@/lib/analytics";

interface BookingContextType {
  isOpen: boolean;
  openBooking: (source?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const ZOHO_BOOKING_URL = "https://meet.digerati-experts.com/";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = useCallback((source: string = "unknown") => {
    analytics.bookingOpened(source);
    setIsOpen(true);
  }, []);
  const closeBooking = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

export { ZOHO_BOOKING_URL };
