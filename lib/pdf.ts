import { jsPDF } from "jspdf";
import { formatEuroForPdf } from "./money";

export type MethodLine = {
  label: string;
  amounts: number[];
  total: number;
};

export type PdfPayload = {
  firstReport: number;
  secondReport: number;
  reportsTotal: number;
  total: number;
  difference: number;
  methods: MethodLine[];
};

const MARGIN = 16;
const PAGE_HEIGHT = 297;
const PAGE_WIDTH = 210;
const RIGHT = PAGE_WIDTH - MARGIN;

/** Construit le releve de caisse. Isole du telechargement pour rester testable. */
export function buildPdf(payload: PdfPayload, now = new Date()): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  const nextPageIfNeeded = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const row = (left: string, right: string, bold = false) => {
    nextPageIfNeeded(7);
    doc.setFont("helvetica", bold ? "bold" : "normal").setFontSize(10);
    doc.setTextColor(bold ? 40 : 80);
    doc.text(left, MARGIN, y);
    doc.text(right, RIGHT, y, { align: "right" });
    y += 6;
  };

  // En-tete
  doc.setFont("helvetica", "bold").setFontSize(20).setTextColor(40);
  doc.text("Compte ta caisse", MARGIN, y + 4);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(120);
  doc.text(
    now.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" }),
    RIGHT,
    y + 4,
    { align: "right" },
  );
  y += 8;
  doc.setDrawColor(200).setLineWidth(0.3);
  doc.line(MARGIN, y, RIGHT, y);
  y += 8;

  // Rapports de caisse
  row("Rapport 1", formatEuroForPdf(payload.firstReport));
  row("Rapport 2", formatEuroForPdf(payload.secondReport));
  row("Total CA", formatEuroForPdf(payload.reportsTotal), true);

  // Moyens de paiement
  y += 4;
  for (const method of payload.methods) {
    const amounts = method.amounts.filter((amount) => amount !== 0);
    if (amounts.length === 0) continue;
    nextPageIfNeeded(12);
    doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(120);
    doc.text(method.label, MARGIN, y);
    doc.text(formatEuroForPdf(method.total), RIGHT, y, { align: "right" });
    y += 5;
    doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(130);
    doc.text(
      amounts.map((amount) => formatEuroForPdf(amount)).join("  +  "),
      MARGIN + 4,
      y,
      { maxWidth: RIGHT - MARGIN - 4 },
    );
    y += 7;
  }

  y += 2;
  row("Total encaissé", formatEuroForPdf(payload.total), true);
  row("Écart avec le CA", formatEuroForPdf(payload.difference), true);

  return doc;
}

/** Genere le releve et declenche le telechargement. Retourne le nom du fichier. */
export function exportToPdf(payload: PdfPayload): string {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 16).replace(/[:T]/g, "-");
  const filename = `caisse-${stamp}.pdf`;
  buildPdf(payload, now).save(filename);
  return filename;
}
