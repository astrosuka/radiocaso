"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = ["agenda", "archivo", "publicaciones", "info"] as const;

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="bg-background flex w-full items-center justify-between border-b p-px">
      <Link href="/" className="mr-2 text-9xl font-black">
        RADIO CASo
      </Link>
      <nav className="flex gap-2 font-mono">
        {navItems.map((item) => {
          const isActive = pathname.endsWith(`/${item}`);
          const baseClasses =
            "uppercase border rounded-full text-xs size-27.25 flex items-center justify-center";
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
    </header>
  );
}
