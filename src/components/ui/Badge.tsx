import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "tag" | "context" | "transmission";
}

const variantStyles = {
  tag: "bg-green text-foreground rounded-2xl",
  context: "bg-foreground/70 text-background rounded-2xl",
  transmission: "bg-background text-foreground",
};
export default function Badge({ children, variant = "tag" }: Props) {
  return (
    <div
      className={`border-foreground/60 font-ibm border px-2 py-1 text-sm lowercase ${variantStyles[variant]}`}
    >
      {children}
    </div>
  );
}
