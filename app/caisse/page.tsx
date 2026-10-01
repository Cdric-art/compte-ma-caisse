"use client";

import { ActionBar } from "@/components/ActionBar";
import { useCash } from "@/components/CashProvider";
import { SummaryBar } from "@/components/SummaryBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PAYMENT_METHODS } from "@/lib/denominations";
import { formatEuro } from "@/lib/money";
import { formatServiceDate } from "@/lib/serviceDate";

export default function CashRegisterPage() {
  const cash = useCash();

  return (
    <main className="flex flex-1 flex-col pb-6">
      <header className="flex items-center justify-between py-2">
        <h1 className="text-3xl font-black">Caisse</h1>
        <ThemeToggle />
      </header>

      <SummaryBar
        total={cash.registerTotal}
        difference={cash.tips}
        differenceLabel="Pourboires"
      />

      <section className="pt-4">
        <h2 className="pb-2 text-xs uppercase tracking-wide opacity-60">
          Date de la caisse
        </h2>
        <input
          type="date"
          value={cash.serviceDate}
          onChange={(event) => cash.setServiceDate(event.target.value)}
          aria-label="Date de la caisse"
          className="w-full rounded-xl bg-surface px-4 py-3 text-center font-mono tabular-nums outline-none focus:ring-2 focus:ring-text/30"
        />
        <p className="pt-2 text-center text-xs opacity-60">
          {formatServiceDate(cash.serviceDate) || "\u00a0"}
        </p>
      </section>

      <section className="pt-6">
        <h2 className="pb-2 text-xs uppercase tracking-wide opacity-60">
          Montant du ou des rapports de caisse
        </h2>
        <div className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3">
          <input
            type="text"
            inputMode="decimal"
            value={cash.firstReport}
            onChange={(event) => cash.setFirstReport(event.target.value)}
            placeholder="0"
            aria-label="Premier rapport de caisse"
            className="min-w-0 flex-1 rounded-lg bg-overlay px-3 py-2 text-center font-mono tabular-nums outline-none focus:ring-2 focus:ring-text/30"
          />
          <span className="font-bold opacity-30">+</span>
          <input
            type="text"
            inputMode="decimal"
            value={cash.secondReport}
            onChange={(event) => cash.setSecondReport(event.target.value)}
            placeholder="0"
            aria-label="Second rapport de caisse"
            className="min-w-0 flex-1 rounded-lg bg-overlay px-3 py-2 text-center font-mono tabular-nums outline-none focus:ring-2 focus:ring-text/30"
          />
        </div>
      </section>

      <section className="pt-6">
        <h2 className="pb-2 text-xs uppercase tracking-wide opacity-60">
          Total CA
        </h2>
        <p className="rounded-xl bg-surface px-4 py-3 text-center font-mono text-lg font-semibold tabular-nums">
          {formatEuro(cash.reportsTotal)}
        </p>
      </section>

      <section className="pt-6">
        <h2 className="pb-2 text-xs uppercase tracking-wide opacity-60">
          Montants des moyens de paiement
        </h2>
        <ul className="flex flex-col gap-4">
          {PAYMENT_METHODS.map((method) => {
            const lines = cash.payments[method.key] ?? [""];
            return (
              <li key={method.key} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-xs font-semibold tracking-wide"
                    style={{ color: method.color }}
                  >
                    {method.label}
                  </span>
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: method.color }}
                  >
                    {formatEuro(cash.paymentTotals[method.key] ?? 0)}
                  </span>
                </div>

                {lines.map((line, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={line}
                      onChange={(event) =>
                        cash.setPaymentLine(method.key, index, event.target.value)
                      }
                      placeholder="0"
                      aria-label={
                        method.singleLine
                          ? method.label
                          : `${method.label}, montant ${index + 1}`
                      }
                      className="min-w-0 flex-1 rounded-xl border bg-surface px-3 py-2.5 font-mono tabular-nums outline-none focus:ring-2 focus:ring-text/30"
                      style={{ borderColor: method.color }}
                    />
                    {method.singleLine ? null : index === 0 ? (
                      <button
                        type="button"
                        onClick={() => cash.addPaymentLine(method.key)}
                        aria-label={`Ajouter un montant à ${method.label}`}
                        className="rounded-full p-2 transition-transform hover:scale-110 active:scale-95"
                        style={{ color: method.color }}
                      >
                        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 8v8M8 12h8" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => cash.removePaymentLine(method.key, index)}
                        aria-label={`Supprimer le montant ${index + 1} de ${method.label}`}
                        className="rounded-full p-2 opacity-50 transition-opacity hover:opacity-100"
                      >
                        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M8 12h8" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Placé après les moyens de paiement : c'est une fois tout saisi que le
          montant est juste, et c'est là qu'on compare au tiroir. */}
      <section className="pt-6">
        <h2 className="pb-2 text-xs uppercase tracking-wide opacity-60">
          Espèces attendues
        </h2>
        <p className="rounded-xl bg-surface px-4 py-3 text-center font-mono text-lg font-semibold tabular-nums">
          {formatEuro(cash.expectedCash)}
        </p>
        <p className="pt-2 text-center text-xs opacity-60">
          Total CA moins les paiements non espèces et les dépenses
        </p>
      </section>

      <ActionBar onReset={cash.resetRegister} />
    </main>
  );
}
