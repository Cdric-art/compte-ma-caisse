"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useClock } from "@/lib/hooks";

/** Les bandes colorées inclinées de l'écran d'accueil iOS. */
const STRIPE_COLORS = [
  "var(--love)",
  "var(--gold)",
  "var(--rose)",
  "var(--pine)",
  "var(--foam)",
  "var(--iris)",
];

/**
 * Inclinées à 32°, les bandes doivent être plus longues et plus nombreuses que
 * la zone visible, sinon leurs extrémités apparaissent au lieu d'être coupées
 * par les bords de l'écran. La palette est donc répétée jusqu'à couvrir la
 * diagonale d'un écran large.
 */
const STRIPES = Array.from({ length: 7 }, () => STRIPE_COLORS).flat();

export default function Home() {
  const now = useClock();

  return (
    <main className="flex flex-1 flex-col">
      <div className="flex justify-start py-2">
        <ThemeToggle />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-8 pb-10">
        <div className="relative ml-[calc(50%-50vw)] flex h-60 w-screen items-center justify-center overflow-hidden">
          <div className="absolute left-1/2 top-1/2 flex w-[250vw] -translate-x-1/2 -translate-y-1/2 -rotate-[32deg] flex-col gap-[44px]">
            {STRIPES.map((color, index) => (
              <div key={index} className="h-px w-full" style={{ background: color }} />
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

        <h1 className="max-w-xs self-center text-center text-4xl font-black leading-tight">
          Compte ta caisse
        </h1>

        <div className="flex flex-col items-center gap-0.5 self-center">
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

        <a
          href="https://github.com/Cdric-art"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 self-center rounded-full px-3 py-2 text-sm opacity-60 transition-opacity hover:opacity-100"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          @Cdric-art
        </a>
      </div>
    </main>
  );
}
