"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useClock } from "@/lib/hooks";

/** Les bandes colorées inclinées de l'écran d'accueil iOS. */
const STRIPE_COLORS = [
  "var(--red)",
  "var(--maroon)",
  "var(--green)",
  "var(--yellow)",
  "var(--pink)",
  "var(--peach)",
  "var(--mauve)",
  "var(--flamingo)",
];

/**
 * Inclinées à 32°, les bandes doivent être plus longues et plus nombreuses que
 * la zone visible, sinon leurs extrémités apparaissent au lieu d'être coupées
 * par les bords de l'écran. La palette est donc répétée jusqu'à couvrir la
 * diagonale d'un écran large.
 */
const STRIPES = Array.from({ length: 5 }, () => STRIPE_COLORS).flat();

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
      </div>
    </main>
  );
}
