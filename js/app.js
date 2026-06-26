/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0003
 * File       : js/app.js
 * ============================================================================
 *
 * Pipeline integration:
 * MediaPipe → Interpretation → OWAS → Render loop hook
 */

import {
    ELEMENTS,
    STATUS,
    LOAD
} from "./constants.js";

import {
    getElement,
    setStatus,
    setReadyStatus,
    loadImage,
    loadVideo
} from "./utils.js";

import {
    state,
    resetAnalysis
} from "./state.js";

import {
    initializeCanvas,
    drawFrame
} from "./renderer/canvas.js";

import {
    initializeOverlay,
    drawLandmarks,
    highlightLandmark
} from "./renderer/overlay.js";

import {
    initializePose,
    estimatePose
} from "./pose/mediapipe.js";

import {
    interpretPose
} from "./pose/interpretation.js";

import {
    evaluateOWAS
} from "./scoring/owas.js";

import {
    exportPdf
} from "./report/pdf.js";

/**
 * Entry point.
 */
async function initializeApplication() {

    wireUIEvents();

    initializeCanvas();

    initializeOverlay();

    setReadyStatus();

}

/**
 * UI events.
 */
function wireUIEvents() {

    getElement(ELEMENTS.FILE_INPUT)
        .addEventListener("change", handleFileInput);

    getElement(ELEMENTS.SAMPLE_BUTTON)
        .addEventListener("click", handleSampling);

    getElement(ELEMENTS.EXPORT_BUTTON)
        .addEventListener("click", handleExport);

    document
        .querySelectorAll(`input[name="${ELEMENTS.LOAD_RADIO_NAME}"]`)
        .forEach(r => r.addEventListener("change", handleLoadChange));

    getElement(ELEMENTS.FRAME_LIST)
        .addEventListener("click", handleFrameClick);

}

/**
 * File input.
 */
async function handleFileInput(event) {

    const files = Array.from(event.target.files || []);

    state.files = files;

    resetAnalysis();

    if (!files.length) return;

    const first = files[0];

    if (first.type.startsWith("image/")) {

        state.image = await loadImage(first);

        drawFrame(state.image);

        await runPosePipeline(state.image);

    } else if (first.type.startsWith("video/")) {

        state.video = await loadVideo(first);

        drawFrame(state.video);

    }

}

/**
 * Runs full pose pipeline.
 */
async function runPosePipeline(input) {

    setStatus(STATUS.PROCESSING);

    await initializePose();

    const landmarks = await estimatePose(input);

    state.landmarksOriginal = landmarks;
    state.landmarksEdited = landmarks;

    if (!landmarks) {

        setStatus("No pose detected");

        return;

    }

    state.interpretation = interpretPose(landmarks);

    state.owas = evaluateOWAS();

    drawLandmarks(landmarks);

    if (state.selectedLandmark >= 0) {

        highlightLandmark(
            landmarks[state.selectedLandmark]
        );

    }

    setStatus(STATUS.READY);

}

/**
 * Sampling.
 */
async function handleSampling() {

    setStatus("Sampling stage reserved for next pipeline commit");

}

/**
 * Export PDF.
 */
async function handleExport() {

    setStatus(STATUS.PROCESSING);

    await exportPdf();

    setStatus(STATUS.READY);

}

/**
 * Load category.
 */
function handleLoadChange(event) {

    const value = Number(event.target.value);

    if (
        value === LOAD.LIGHT ||
        value === LOAD.MEDIUM ||
        value === LOAD.HEAVY
    ) {
        state.loadCategory = value;
    }

}

/**
 * Frame selection.
 */
function handleFrameClick(event) {

    const item = event.target.closest("li");

    if (!item) return;

    const index = Number(item.dataset.index);

    state.currentFrameIndex = index;

    const frame = state.frames[index];

    if (!frame) return;

    drawFrame(frame.image);

}

/**
 * Start.
 */
initializeApplication();
