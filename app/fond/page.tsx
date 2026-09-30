"use client";

import { ActionBar } from "@/components/ActionBar";
import { useCash } from "@/components/CashProvider";
import { SummaryBar } from "@/components/SummaryBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DENOMINATIONS } from "@/lib/denominations";
import { formatEuro, parseCount } from "@/lib/money";

export default function CashFundPage() {
  const cash = useCash();

  return (
    <main className="flex flex-1 flex-col pb-6">
      <header className="flex items-center justify-between py-2">
        <h1 className="text-3xl font-black">Fond</h1>
        <ThemeToggle />
      </header>

      <SummaryBar total={cash.fundTotal} difference={cash.fundDifference} />

      <section className="pt-4">
        <h2 className="pb-2 text-xs uppercase tracking-wide opacity-60">
          Montant initial du fond de caisse
        </h2>
        <input
          type="text"
          inputMode="decimal"
          value={cash.expected}
          onChange={(event) => cash.setExpected(event.target.value)}
          placeholder="0"
          className="w-full rounded-xl bg-surface px-4 py-3 text-center font-mono tabular-nums outline-none focus:ring-2 focus:ring-text/30"
        />
      </section>

      <section className="pt-6">
        <h2 className="pb-2 text-xs uppercase tracking-wide opacity-60">
          Billets et pièces
        </h2>
        <ul className="flex flex-col gap-2">
          {DENOMINATIONS.map((denomination) => {
            const count = parseCount(cash.counts[denomination.key] ?? "");
            return (
              <li
                key={denomination.key}
                className="flex items-center gap-3 rounded-xl border bg-surface px-3 py-2.5"
                style={{ borderColor: denomination.color }}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  value={cash.counts[denomination.key] ?? ""}
                  onChange={(event) =>
                    cash.setCount(denomination.key, event.target.value)
                  }
                  placeholder="0"
                  aria-label={`Quantité de ${denomination.label}`}
                  className="w-14 rounded-lg bg-overlay px-2 py-1.5 text-center font-mono tabular-nums outline-none focus:ring-2 focus:ring-text/30"
                />
                <span className="text-sm opacity-50">×</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: denomination.color }}
                >
                  {denomination.label}
                </span>
                <span className="ml-auto text-sm opacity-50">=</span>
                <span className="w-24 text-right font-mono text-sm tabular-nums">
                  {formatEuro(count * denomination.value)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <ActionBar onReset={cash.resetFund} withExport={false} />
    </main>
  );
}
