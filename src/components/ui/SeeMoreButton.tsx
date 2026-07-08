import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export default function SeeMoreButton({
  children,
  link,
}: {
  children: ReactNode;
  link: LinkProps["href"];
}) {
  return (
    <Link href={link} className="border-foreground/20 border px-2 py-1 italic">
      + {children}
    </Link>
  );
}
