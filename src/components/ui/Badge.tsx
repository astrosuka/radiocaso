import { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="bg-foreground/80 text-background rounded border px-1 text-xs lowercase">
      {children}
    </div>
  );
}
