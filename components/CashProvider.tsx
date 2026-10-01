"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { DENOMINATIONS, PAYMENT_METHODS } from "@/lib/denominations";
import { useDefaultServiceDate } from "@/lib/hooks";
import { parseAmount, parseCount } from "@/lib/money";

type Counts = Record<string, string>;
type Payments = Record<string, string[]>;

const emptyCounts = (): Counts =>
  Object.fromEntries(DENOMINATIONS.map((d) => [d.key, ""]));

const emptyPayments = (): Payments =>
  Object.fromEntries(PAYMENT_METHODS.map((m) => [m.key, [""]]));

type CashContextValue = {
  // Fond de caisse
  expected: string;
  setExpected: (value: string) => void;
  counts: Counts;
  setCount: (key: string, value: string) => void;
  fundTotal: number;
  fundDifference: number;
  resetFund: () => void;

  // Caisse
  serviceDate: string;
  setServiceDate: (value: string) => void;
  firstReport: string;
  setFirstReport: (value: string) => void;
  secondReport: string;
  setSecondReport: (value: string) => void;
  payments: Payments;
  setPaymentLine: (key: string, index: number, value: string) => void;
  addPaymentLine: (key: string) => void;
  removePaymentLine: (key: string, index: number) => void;
  paymentTotals: Record<string, number>;
  registerTotal: number;
  reportsTotal: number;
  /** Espèces que la caisse devrait contenir une fois le reste déduit du CA. */
  expectedCash: number;
  /** Excédent d'espèces trouvé dans le tiroir. */
  tips: number;
  resetRegister: () => void;
};

const CashContext = createContext<CashContextValue | null>(null);

/**
 * L'etat vit au niveau du layout, comme le TabView de l'app iOS : passer d'un
 * onglet a l'autre conserve la saisie, un rechargement de page repart de zero.
 */
export function CashProvider({ children }: { children: React.ReactNode }) {
  const [expected, setExpected] = useState("");
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  // null tant que la date proposee n'a pas ete corrigee a la main.
  const [serviceDateOverride, setServiceDateOverride] = useState<string | null>(null);
  const defaultServiceDate = useDefaultServiceDate();
  const [firstReport, setFirstReport] = useState("");
  const [secondReport, setSecondReport] = useState("");
  const [payments, setPayments] = useState<Payments>(emptyPayments);

  const value = useMemo<CashContextValue>(() => {
    const fundTotal = DENOMINATIONS.reduce(
      (sum, d) => sum + parseCount(counts[d.key] ?? "") * d.value,
      0,
    );

    const paymentTotals = Object.fromEntries(
      PAYMENT_METHODS.map((m) => [
        m.key,
        (payments[m.key] ?? []).reduce((sum, line) => sum + parseAmount(line), 0),
      ]),
    );

    const registerTotal = Object.values(paymentTotals).reduce((a, b) => a + b, 0);
    const reportsTotal = parseAmount(firstReport) + parseAmount(secondReport);

    // Le CA moins tout ce qui n'est pas des espèces : les paiements par carte,
    // mais aussi les dépenses, réglées en prenant dans le tiroir.
    const expectedCash = reportsTotal - (registerTotal - (paymentTotals.cash ?? 0));

    return {
      expected,
      setExpected,
      counts,
      setCount: (key, v) => setCounts((prev) => ({ ...prev, [key]: v })),
      fundTotal,
      fundDifference: fundTotal - parseAmount(expected),
      resetFund: () => {
        setExpected("");
        setCounts(emptyCounts());
      },

      serviceDate: serviceDateOverride ?? defaultServiceDate,
      setServiceDate: setServiceDateOverride,
      firstReport,
      setFirstReport,
      secondReport,
      setSecondReport,
      payments,
      setPaymentLine: (key, index, v) =>
        setPayments((prev) => {
          const lines = [...(prev[key] ?? [""])];
          lines[index] = v;
          return { ...prev, [key]: lines };
        }),
      addPaymentLine: (key) =>
        setPayments((prev) => ({ ...prev, [key]: [...(prev[key] ?? []), ""] })),
      removePaymentLine: (key, index) =>
        setPayments((prev) => {
          const lines = (prev[key] ?? [""]).filter((_, i) => i !== index);
          return { ...prev, [key]: lines.length > 0 ? lines : [""] };
        }),
      paymentTotals,
      registerTotal,
      reportsTotal,
      expectedCash,
      // Équivaut à (espèces comptées − espèces attendues) : une dépense réduit
      // d'autant les espèces attendues, l'ajouter au total le compense.
      tips: registerTotal - reportsTotal,
      resetRegister: () => {
        setServiceDateOverride(null);
        setFirstReport("");
        setSecondReport("");
        setPayments(emptyPayments());
      },
    };
  }, [
    expected,
    counts,
    serviceDateOverride,
    defaultServiceDate,
    firstReport,
    secondReport,
    payments,
  ]);

  return <CashContext.Provider value={value}>{children}</CashContext.Provider>;
}

export function useCash(): CashContextValue {
  const context = useContext(CashContext);
  if (!context) {
    throw new Error("useCash doit être utilisé dans un CashProvider");
  }
  return context;
}
