import { jsPDF } from "jspdf";
import { formatEuroForPdf } from "./money";

export type FundLine = {
  label: string;
  count: number;
  value: number;
  subtotal: number;
};

export type MethodLine = {
  label: string;
  amounts: number[];
  total: number;
};

export type PdfPayload = {
  fund: {
    expected: number;
    total: number;
    difference: number;
    lines: FundLine[];
  };
  register: {
    firstReport: number;
    secondReport: number;
    reportsTotal: number;
    total: number;
    difference: number;
    methods: MethodLine[];
  };
};

const MARGIN = 16;
const PAGE_HEIGHT = 297;
const PAGE_WIDTH = 210;
const RIGHT = PAGE_WIDTH - MARGIN;

/** Construit le releve. Isole du telechargement pour rester testable. */
export function buildPdf(payload: PdfPayload, now = new Date()): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  const nextPageIfNeeded = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const heading = (text: string) => {
    nextPageIfNeeded(16);
    y += 6;
    doc.setFont("helvetica", "bold").setFontSize(13).setTextColor(40);
    doc.text(text, MARGIN, y);
    y += 2;
    doc.setDrawColor(200).setLineWidth(0.3);
    doc.line(MARGIN, y, RIGHT, y);
    y += 6;
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
  y += 10;

  // Fond de caisse
  heading("Fond de caisse");
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(120);
  doc.text("Coupure", MARGIN, y);
  doc.text("Quantité", MARGIN + 60, y, { align: "right" });
  doc.text("Sous-total", RIGHT, y, { align: "right" });
  y += 5;

  const counted = payload.fund.lines.filter((line) => line.count > 0);
  if (counted.length === 0) {
    row("Aucune coupure comptée", "—");
  } else {
    for (const line of counted) {
      nextPageIfNeeded(7);
      doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(80);
      doc.text(line.label, MARGIN, y);
      doc.text(String(line.count), MARGIN + 60, y, { align: "right" });
      doc.text(formatEuroForPdf(line.subtotal), RIGHT, y, { align: "right" });
      y += 6;
    }
  }

  y += 2;
  row("Total compté", formatEuroForPdf(payload.fund.total), true);
  row("Fond de caisse attendu", formatEuroForPdf(payload.fund.expected));
  row("Écart", formatEuroForPdf(payload.fund.difference), true);

  // Caisse
  heading("Caisse");
  row("Rapport 1", formatEuroForPdf(payload.register.firstReport));
  row("Rapport 2", formatEuroForPdf(payload.register.secondReport));
  row("Total CA", formatEuroForPdf(payload.register.reportsTotal), true);

  y += 4;
  for (const method of payload.register.methods) {
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
  row("Total encaissé", formatEuroForPdf(payload.register.total), true);
  row("Écart avec le CA", formatEuroForPdf(payload.register.difference), true);

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
