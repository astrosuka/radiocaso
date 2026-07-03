"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = ["agenda", "archivo", "publicaciones", "info"] as const;

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 font-mono">
      <Link href="/" className="mr-2 text-2xl font-black">
        RADIO CASo
      </Link>
      {navItems.map((item) => {
        const isActive = pathname.endsWith(`/${item}`);
        const baseClasses = "uppercase";
        return (
          <Link
            key={item}
            href={item}
            className={
              isActive
                ? baseClasses + " bg-foreground text-background"
                : baseClasses
            }
          >
            <span>{item}</span>
          </Link>
        );
      })}
    </nav>
  );
}
