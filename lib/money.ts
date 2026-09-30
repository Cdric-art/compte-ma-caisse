/** Saisie libre ("12,50" ou "12.50") vers nombre. Une entree vide ou invalide vaut 0. */
export function parseAmount(input: string): number {
  const value = Number.parseFloat(input.replace(",", "."));
  return Number.isFinite(value) ? value : 0;
}

/** Quantite de billets ou de pieces : entier positif uniquement. */
export function parseCount(input: string): number {
  const value = Number.parseInt(input, 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatEuro(value: number): string {
  return euro.format(value);
}

/**
 * jsPDF ecrit en WinAnsi : les espaces fines insecables produites par Intl
 * n'y existent pas et ressortent en caractere parasite.
 */
export function formatEuroForPdf(value: number): string {
  return formatEuro(value).replace(/[  ]/g, " ");
}
