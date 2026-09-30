"use client";

import { useState } from "react";
import { DENOMINATIONS, PAYMENT_METHODS } from "@/lib/denominations";
import { parseAmount, parseCount } from "@/lib/money";
import { exportToPdf } from "@/lib/pdf";
import { useCash } from "./CashProvider";

/**
 * Remise à zéro de l'écran courant, et export PDF du relevé complet (fond +
 * caisse) là où il est proposé.
 */
export function ActionBar({
  onReset,
  withExport = true,
}: {
  onReset: () => void;
  withExport?: boolean;
}) {
  const cash = useCash();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleExport = () => {
    const filename = exportToPdf({
      fund: {
        expected: parseAmount(cash.expected),
        total: cash.fundTotal,
        difference: cash.fundDifference,
        lines: DENOMINATIONS.map((d) => {
          const count = parseCount(cash.counts[d.key] ?? "");
          return {
            label: d.label,
            count,
            value: d.value,
            subtotal: count * d.value,
          };
        }),
      },
      register: {
        firstReport: parseAmount(cash.firstReport),
        secondReport: parseAmount(cash.secondReport),
        reportsTotal: cash.reportsTotal,
        total: cash.registerTotal,
        difference: cash.registerDifference,
        methods: PAYMENT_METHODS.map((m) => ({
          label: m.label,
          amounts: (cash.payments[m.key] ?? []).map(parseAmount),
          total: cash.paymentTotals[m.key] ?? 0,
        })),
      },
    });
    setFeedback(filename);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex flex-col gap-2 pt-6">
      <div className={`flex gap-3 ${withExport ? "" : "justify-center"}`}>
        {withExport && (
          <button
            type="button"
            onClick={handleExport}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-text px-4 py-3 text-sm font-semibold text-base transition-opacity hover:opacity-85 active:opacity-70"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            Exporter en PDF
          </button>
        )}
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-text/25 px-4 py-3 text-sm font-medium transition-colors hover:bg-surface"
        >
          Réinitialiser
        </button>
      </div>
      {feedback && (
        <p className="text-center text-xs opacity-60">
          {feedback} téléchargé
        </p>
      )}
    </div>
  );
}
