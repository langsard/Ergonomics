/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0005
 * File       : js/report/pdf.js
 * ============================================================================
 *
 * PDF report generation module (final integration layer).
 *
 * Updates:
 * - Integrates analysis statistics
 * - Adds worst frame summary
 * - Prepares per-frame report structure hook
 */

import { state } from "../state.js";

import { buildAnalysisSummary } from "../analysis/statistics.js";

/**
 * Checks PDF library.
 */
function isPdfLibAvailable() {

    return typeof window !== "undefined" &&
        window.PDFLib &&
        window.PDFLib.PDFDocument;

}

/**
 * Creates document.
 */
async function createPdfDocument() {

    const { PDFDocument } = window.PDFLib;

    return PDFDocument.create();

}

/**
 * Adds text page.
 */
async function addTextPage(pdf, text) {

    const { StandardFonts, rgb } = window.PDFLib;

    const page = pdf.addPage([595, 842]);

    const font = await pdf.embedFont(StandardFonts.Helvetica);

    page.drawText(text, {

        x: 50,
        y: 780,
        size: 11,
        font,
        color: rgb(0, 0, 0)

    });

}

/**
 * Builds OWAS summary.
 */
function buildOwasSummary() {

    const owas = state.owas;

    if (!owas) return "OWAS: Not evaluated";

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
 * Builds statistics block.
 */
function buildStatsBlock(summary) {

    const dist = summary.distribution;

    return [
        `Total Frames: ${summary.totalFrames}`,
        `Category 1: ${dist[1]}`,
        `Category 2: ${dist[2]}`,
        `Category 3: ${dist[3]}`,
        `Category 4: ${dist[4]}`,
        ``,
        `Worst Frame Index: ${summary.worstFrame.index}`,
        `Worst Category: ${summary.worstFrame.category ?? "N/A"}`
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

    const summary = buildAnalysisSummary();

    await addTextPage(
        pdf,
        "Sit Tight\nOWAS Ergonomics Report\nCommit 0005"
    );

    await addTextPage(
        pdf,
        buildStatsBlock(summary)
    );

    await addTextPage(
        pdf,
        buildOwasSummary()
    );

    const bytes = await pdf.save();

    const blob = new Blob([bytes], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "sit_tight_report.pdf";

    a.click();

    URL.revokeObjectURL(url);
}
