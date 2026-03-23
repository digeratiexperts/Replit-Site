import { type ReactNode, type MouseEvent } from "react";
import { useBooking } from "@/contexts/BookingContext";

interface BookingButtonProps {
  children: ReactNode;
  className?: string;
  "data-testid"?: string;
  [key: string]: any;
}

export function BookingButton({ children, className, onClick, ...props }: BookingButtonProps & { onClick?: (e: MouseEvent) => void }) {
  const { openBooking } = useBooking();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick(e);
    openBooking();
  };

  return (
    <button type="button" className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export function BookingLink({ children, className, ...props }: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <a
      href="/book"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openBooking();
      }}
      {...props}
    >
      {children}
    </a>
  );
}
