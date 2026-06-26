/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0004
 * File       : js/app.js
 * ============================================================================
 *
 * Full interaction wiring:
 * - Canvas click selection
 * - Landmark editing mode
 * - Live re-render pipeline
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

import {
    handleCanvasClick,
    handleCanvasEdit
} from "./review/controller.js";

import {
    initializeEditor
} from "./review/editor.js";

/**
 * Entry.
 */
async function initializeApplication() {

    wireUIEvents();

    initializeCanvas();

    initializeOverlay();

    initializeEditor();

    attachCanvasEvents();

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
 * Canvas interaction wiring.
 */
function attachCanvasEvents() {

    const canvas = getElement(ELEMENTS.CANVAS);

    canvas.addEventListener("click", (e) => {

        handleCanvasClick(e, canvas);

        rerender();

    });

    canvas.addEventListener("contextmenu", (e) => {

        e.preventDefault();

        handleCanvasEdit(e, canvas);

        rerender();

    });

}

/**
 * Full rerender pipeline.
 */
function rerender() {

    const frame =
        state.image ||
        (state.frames[state.currentFrameIndex]?.image);

    if (!frame) return;

    drawFrame(frame);

    if (state.landmarksEdited || state.landmarksOriginal) {

        const lm =
            state.landmarksEdited ||
            state.landmarksOriginal;

        drawLandmarks(lm);

        if (state.selectedLandmark >= 0) {

            highlightLandmark(lm[state.selectedLandmark]);
        }

    }
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
 * Pose pipeline.
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

    rerender();

    setStatus(STATUS.READY);
}

/**
 * Sampling placeholder.
 */
async function handleSampling() {

    setStatus("Sampling reserved for future commit");
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
 * Load change.
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

    rerender();
}

/**
 * Start app.
 */
initializeApplication();
