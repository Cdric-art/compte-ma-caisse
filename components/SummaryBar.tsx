"use client";

import { formatEuro } from "@/lib/money";

/**
 * Les deux capsules reprises de l'app iOS. La seconde se nomme « Différence »
 * sur le fond de caisse, « Pourboires » sur la caisse : le même calcul, mais
 * un excédent d'espèces n'y est pas un écart, c'est de la recette en plus.
 */
export function SummaryBar({
  total,
  difference,
  differenceLabel = "Différence",
}: {
  total: number;
  difference: number;
  differenceLabel?: string;
}) {
  return (
    <div className="sticky top-0 z-10 -mx-4 flex gap-3 bg-base/95 px-4 py-3 backdrop-blur">
      <div className="flex flex-1 flex-col rounded-full bg-surface px-4 py-2 text-center">
        <span className="text-[11px] opacity-60">Total</span>
        <span className="font-mono text-sm font-semibold tabular-nums">
          {formatEuro(total)}
        </span>
      </div>
      <div
        className="flex flex-1 flex-col rounded-full bg-surface px-4 py-2 text-center"
        style={{ color: difference > 0 ? "var(--positive)" : "var(--text)" }}
      >
        <span className="text-[11px] opacity-60">{differenceLabel}</span>
        <span className="font-mono text-sm font-semibold tabular-nums">
          {formatEuro(difference)}
        </span>
      </div>
    </div>
  );
}
