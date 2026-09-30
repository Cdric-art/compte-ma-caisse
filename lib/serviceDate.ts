/**
 * Heure a partir de laquelle une nouvelle journee de service commence. Une
 * caisse faite a 2 h du matin appartient encore au service de la veille.
 */
const NEW_DAY_HOUR = 6;

/** Date locale au format YYYY-MM-DD, celui attendu par <input type="date">. */
export function toISODate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Service auquel se rattache une cloture faite a cet instant. */
export function defaultServiceDate(now: Date): string {
  const date = new Date(now);
  if (date.getHours() < NEW_DAY_HOUR) {
    date.setDate(date.getDate() - 1);
  }
  return toISODate(date);
}

/** "2026-09-30" -> "mercredi 30 septembre 2026". */
export function formatServiceDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "";
  return new Date(year, month - 1, day).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
