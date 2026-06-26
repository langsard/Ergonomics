/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0002
 * File       : js/report/pdf.js
 * ============================================================================
 *
 * PDF report generation module (enhanced).
 *
 * Updates:
 * - Frame-aware reporting structure
 * - OWAS inclusion if available
 * - Safer rendering pipeline
 */

import { state } from "../state.js";

/**
 * Checks if pdf-lib is available.
 */
function isPdfLibAvailable() {

    return typeof window !== "undefined" &&
           window.PDFLib &&
           window.PDFLib.PDFDocument;

}

/**
 * Creates PDF document.
 */
async function createPdfDocument() {

    const { PDFDocument } = window.PDFLib;

    return PDFDocument.create();

}

/**
 * Adds a text page.
 */
async function addTextPage(pdf, text) {

    const { StandardFonts, rgb } = window.PDFLib;

    const page = pdf.addPage([595, 842]);

    const font = await pdf.embedFont(StandardFonts.Helvetica);

    page.drawText(text, {

        x: 50,
        y: 780,
        size: 12,
        font,
        color: rgb(0, 0, 0)

    });

}

/**
 * Adds OWAS summary block.
 */
function buildOwasSummary() {

    const owas = state.owas;

    if (!owas) {

        return "OWAS: Not evaluated";

    }

    return [
        `OWAS Code: ${owas.code}`,
        `Back: ${owas.back}`,
        `Arms: ${owas.arms}`,
        `Legs: ${owas.legs}`,
        `Load: ${owas.load}`,
        `Action Category: ${owas.actionCategory}`,
        `Verdict: ${owas.verdict}`
    ].join("\n");

}

/**
 * Exports PDF report.
 */
export async function exportPdf() {

    if (!isPdfLibAvailable()) {

        alert("PDF library not loaded");

        return;

    }

    const pdf = await createPdfDocument();

    await addTextPage(
        pdf,
        "Sit Tight\nOWAS Ergonomics Report\nCommit 0002"
    );

    const frameCount = state.frames.length;

    const summary =
        `Frames analysed: ${frameCount}\n` +
        `Load category: ${state.loadCategory}\n\n` +
        buildOwasSummary();

    await addTextPage(pdf, summary);

    const bytes = await pdf.save();

    const blob = new Blob([bytes], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "sit_tight_report.pdf";

    a.click();

    URL.revokeObjectURL(url);
}
