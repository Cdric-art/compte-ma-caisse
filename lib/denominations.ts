export type Denomination = {
  key: string;
  value: number;
  label: string;
  color: string;
};

/** Billets puis pieces, dans l'ordre de l'app iOS.
 * Rose Pine n'offre que six accents : ils cyclent, donc deux coupures
 * voisines n'ont jamais la meme couleur. */
export const DENOMINATIONS: Denomination[] = [
  { key: "b100", value: 100, label: "100 €", color: "var(--gold)" },
  { key: "b50", value: 50, label: "50 €", color: "var(--foam)" },
  { key: "b20", value: 20, label: "20 €", color: "var(--rose)" },
  { key: "b10", value: 10, label: "10 €", color: "var(--iris)" },
  { key: "b5", value: 5, label: "5 €", color: "var(--pine)" },
  { key: "c2", value: 2, label: "2 €", color: "var(--love)" },
  { key: "c1", value: 1, label: "1 €", color: "var(--gold)" },
  { key: "c050", value: 0.5, label: "50 cts", color: "var(--foam)" },
  { key: "c020", value: 0.2, label: "20 cts", color: "var(--rose)" },
  { key: "c010", value: 0.1, label: "10 cts", color: "var(--iris)" },
  { key: "c005", value: 0.05, label: "5 cts", color: "var(--pine)" },
  { key: "c002", value: 0.02, label: "2 cts", color: "var(--love)" },
  { key: "c001", value: 0.01, label: "1 ct", color: "var(--gold)" },
];

export type PaymentMethod = {
  key: string;
  label: string;
  color: string;
  /** Un seul montant saisissable, sans bouton d'ajout de ligne. */
  singleLine?: boolean;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { key: "cbEmv", label: "CB EMV", color: "var(--iris)" },
  { key: "cbLess", label: "CB SANS CONTACT", color: "var(--foam)" },
  { key: "amex", label: "AMEX CONTACT", color: "var(--love)" },
  { key: "amexLess", label: "AMEX EXPRESSPAY", color: "var(--rose)" },
  { key: "ticket", label: "TICKETS RESTAURANT", color: "var(--gold)" },
  { key: "holidayVoucher", label: "CHÈQUES VACANCES", color: "var(--iris)" },
  { key: "expenses", label: "DÉPENSES", color: "var(--pine)" },
  { key: "cash", label: "ESPÈCES", color: "var(--love)", singleLine: true },
];
