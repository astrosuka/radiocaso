import { ReactNode } from "react";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="uppercase italic">{children}</h2>;
}
