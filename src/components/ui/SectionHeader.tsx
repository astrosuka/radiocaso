import { ReactNode } from "react";

export default function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="border-b-foreground/60 mb-3 flex w-full justify-between border-b py-6">
      {children}
    </div>
  );
}
