export type Denomination = {
  key: string;
  value: number;
  label: string;
  color: string;
};

/** Billets puis pieces, dans l'ordre de l'app iOS. */
export const DENOMINATIONS: Denomination[] = [
  { key: "b100", value: 100, label: "100 €", color: "var(--yellow)" },
  { key: "b50", value: 50, label: "50 €", color: "var(--primary)" },
  { key: "b20", value: 20, label: "20 €", color: "var(--flamingo)" },
  { key: "b10", value: 10, label: "10 €", color: "var(--mauve)" },
  { key: "b5", value: 5, label: "5 €", color: "var(--green)" },
  { key: "c2", value: 2, label: "2 €", color: "var(--peach)" },
  { key: "c1", value: 1, label: "1 €", color: "var(--secondary)" },
  { key: "c050", value: 0.5, label: "50 cts", color: "var(--red)" },
  { key: "c020", value: 0.2, label: "20 cts", color: "var(--mauve)" },
  { key: "c010", value: 0.1, label: "10 cts", color: "var(--maroon)" },
  { key: "c005", value: 0.05, label: "5 cts", color: "var(--pink)" },
  { key: "c002", value: 0.02, label: "2 cts", color: "var(--flamingo)" },
  { key: "c001", value: 0.01, label: "1 ct", color: "var(--green)" },
];

export type PaymentMethod = {
  key: string;
  label: string;
  color: string;
  /** Un seul montant saisissable, sans bouton d'ajout de ligne. */
  singleLine?: boolean;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { key: "cbEmv", label: "CB EMV", color: "var(--mauve)" },
  { key: "cbLess", label: "CB SANS CONTACT", color: "var(--primary)" },
  { key: "amex", label: "AMEX CONTACT", color: "var(--maroon)" },
  { key: "amexLess", label: "AMEX EXPRESSPAY", color: "var(--flamingo)" },
  { key: "ticket", label: "TICKETS RESTAURANT", color: "var(--yellow)" },
  { key: "holidayVoucher", label: "CHÈQUES VACANCES", color: "var(--pink)" },
  { key: "expenses", label: "DÉPENSES", color: "var(--green)" },
  { key: "cash", label: "ESPÈCES", color: "var(--peach)", singleLine: true },
];
