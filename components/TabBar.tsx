"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Accueil", icon: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5" },
  { href: "/fond", label: "Fond de caisse", icon: "M3 13h4l1.5 3h7L17 13h4M4 13l2-7h12l2 7v5H4z" },
  { href: "/caisse", label: "Caisse", icon: "M12 3v8m0-8-3 3m3-3 3 3M3 13h4l1.5 3h7L17 13h4v5H3z" },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-10 border-t border-text/10 bg-surface/95 backdrop-blur print:hidden">
      <ul className="mx-auto flex max-w-3xl">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2 text-[11px] transition-opacity ${
                  active ? "text-text opacity-100" : "text-text opacity-45 hover:opacity-70"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={active ? 2.2 : 1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={tab.icon} />
                </svg>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
