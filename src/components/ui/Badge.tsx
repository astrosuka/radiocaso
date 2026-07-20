import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "tag" | "tag-active" | "context" | "transmission";
}

const variantStyles = {
  tag: "bg-green text-foreground dark:text-background rounded-2xl",
  "tag-active": "bg-foreground text-background rounded-2xl",
  context: "bg-foreground/70 text-background rounded-2xl",
  transmission: "bg-background text-foreground border border-foreground/60",
};
export default function Badge({ children, variant = "tag" }: Props) {
  return (
    <div
      className={`font-ibm px-2 py-1 text-xs lowercase ${variantStyles[variant]}`}
    >
      {children}
    </div>
  );
}
