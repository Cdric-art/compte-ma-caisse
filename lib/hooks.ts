"use client";

import { useSyncExternalStore } from "react";

/**
 * Le thème vit sur <html> : il est posé par le script inline avant l'hydratation.
 * On le lit comme un store externe pour rester synchrone avec le DOM.
 */
export function useIsDark(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

/** Horloge à la seconde. Rend `null` côté serveur : l'heure est celle du visiteur. */
export function useClock(): Date | null {
  const seconds = useSyncExternalStore(
    (onChange) => {
      const id = setInterval(onChange, 1000);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / 1000),
    () => null,
  );

  return seconds === null ? null : new Date(seconds * 1000);
}
