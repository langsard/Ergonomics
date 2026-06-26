/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/report/pdf.js
 * ============================================================================
 *
 * PDF report generation module.
 *
 * Responsible for:
 * - Creating OWAS report PDFs
 * - Rendering frames, tables, and summary pages
 */

import { state } from "../state.js";

/**
 * Checks if pdf-lib is available.
 *
 * @returns {boolean}
 */
function isPdfLibAvailable() {

    return typeof window !== "undefined" &&
           window.PDFLib &&
           window.PDFLib.PDFDocument;

}

/**
 * Creates a new PDF document.
 *
 * @returns {Promise<any>}
 */
async function createPdfDocument() {

    const { PDFDocument } = window.PDFLib;

    return PDFDocument.create();

}

/**
 * Adds a simple text page.
 *
 * @param {any} pdf
 * @param {string} text
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
 * Generates a minimal OWAS report PDF.
 */
export async function exportPdf() {

    if (!isPdfLibAvailable()) {

        alert("PDF library not loaded");

        return;

    }

    const pdf = await createPdfDocument();

    // Title page
    await addTextPage(
        pdf,
        "Sit Tight\nOWAS Ergonomics Report\n\nCommit 0001"
    );

    // Frame summary page
    const summary =
        `Frames analysed: ${state.frames.length}\n` +
        `Selected load category: ${state.loadCategory}\n` +
        `OWAS result available: ${state.owas ? "Yes" : "No"}`;

    await addTextPage(pdf, summary);

    const bytes = await pdf.save();

    const blob = new Blob([bytes], {

        type: "application/pdf"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "sit_tight_report.pdf";
    a.click();

    URL.revokeObjectURL(url);
}
