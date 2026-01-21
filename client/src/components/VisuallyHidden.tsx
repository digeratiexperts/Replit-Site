import { ReactNode } from "react";

interface VisuallyHiddenProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export function VisuallyHidden({ children, as: Component = "span" }: VisuallyHiddenProps) {
  return (
    <Component className="sr-only">
      {children}
    </Component>
  );
}

export function LiveRegion({ 
  children, 
  politeness = "polite",
  atomic = true 
}: { 
  children: ReactNode;
  politeness?: "polite" | "assertive";
  atomic?: boolean;
}) {
  return (
    <div
      role={politeness === "assertive" ? "alert" : "status"}
      aria-live={politeness}
      aria-atomic={atomic}
      className="sr-only"
    >
      {children}
    </div>
  );
}
