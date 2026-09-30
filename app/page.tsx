"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useClock } from "@/lib/hooks";

/** Les bandes colorées inclinées de l'écran d'accueil iOS. */
const STRIPES = [
  "var(--red)",
  "var(--maroon)",
  "var(--green)",
  "var(--yellow)",
  "var(--pink)",
  "var(--peach)",
  "var(--mauve)",
  "var(--flamingo)",
];

export default function Home() {
  const now = useClock();

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex justify-start py-2">
        <ThemeToggle />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-10">
        <div className="relative flex h-60 w-full items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex origin-center -rotate-[32deg] scale-150 flex-col justify-center gap-[22px]">
            {STRIPES.map((color) => (
              <div key={color} className="h-px w-full" style={{ background: color }} />
            ))}
          </div>
          <div className="relative flex size-44 items-center justify-center rounded-full bg-text shadow-[6px_6px_18px_var(--text)]">
            <Image
              src="/cash-register.png"
              alt=""
              width={100}
              height={100}
              priority
              className="h-24 w-auto"
            />
          </div>
        </div>

        <h1 className="max-w-xs text-center text-4xl font-black leading-tight">
          Compte ta caisse
        </h1>

        <div className="flex flex-col items-center gap-0.5">
          <p className="text-lg">
            {now?.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            }) ?? " "}
          </p>
          <p className="font-mono text-sm tabular-nums opacity-70">
            {now?.toLocaleTimeString("fr-FR") ?? " "}
          </p>
        </div>
      </div>
    </main>
  );
}
