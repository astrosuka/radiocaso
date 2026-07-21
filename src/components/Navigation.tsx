"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = ["agenda", "archivo", "publicaciones", "info"] as const;

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="bg-background flex w-full items-center justify-between border-b">
      <Link
        href="/"
        className="_text-[6vw] _md:text-[7vw] _lg:text-[8vw] mx-4 text-6xl font-extrabold"
      >
        RADIO CASo
      </Link>
      <nav className="font-ibm _gap-2 flex h-full">
        {navItems.map((item) => {
          const isActive =
            pathname === `/${item}` || pathname.startsWith(`/${item}/`);
          const baseClasses =
            "uppercase border-l px-3 _rounded-full _size-24 text-xs lg:text-sm _lg:size-27.25 flex items-center justify-center";
          return (
            <Link
              key={item}
              href={`/${item}`}
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
