/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0002
 * File       : js/app.js
 * ============================================================================
 *
 * Adds rendering pipeline initialization and frame selection support.
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
    initializeOverlay
} from "./renderer/overlay.js";

/**
 * Application entry point.
 */
function initializeApplication() {

    wireUIEvents();

    initializeCanvas();

    initializeOverlay();

    setReadyStatus();

}

/**
 * Wires all UI events.
 */
function wireUIEvents() {

    getElement(ELEMENTS.FILE_INPUT)
        .addEventListener("change", handleFileInput);

    getElement(ELEMENTS.SAMPLE_BUTTON)
        .addEventListener("click", handleSampling);

    getElement(ELEMENTS.EXPORT_BUTTON)
        .addEventListener("click", handleExport);

    document
        .querySelectorAll(
            `input[name="${ELEMENTS.LOAD_RADIO_NAME}"]`
        )
        .forEach(radio => {

            radio.addEventListener("change", handleLoadChange);

        });

    /**
     * Frame selection
     */
    getElement(ELEMENTS.FRAME_LIST)
        .addEventListener("click", handleFrameClick);

}

/**
 * Handles file input.
 */
async function handleFileInput(event) {

    const files = Array.from(event.target.files || []);

    state.files = files;

    setStatus(`${files.length} file(s) loaded`);

    resetAnalysis();

    if (!files.length) return;

    const first = files[0];

    if (first.type.startsWith("image/")) {

        state.image = await loadImage(first);

        drawFrame(state.image);

    } else if (first.type.startsWith("video/")) {

        state.video = await loadVideo(first);

        drawFrame(state.video);

    }

}

/**
 * Handles sampling (stub pipeline integration point).
 */
async function handleSampling() {

    if (!state.video) {

        setStatus("No video loaded");

        return;

    }

    setStatus(STATUS.PROCESSING);

    setTimeout(() => {

        setStatus("Sampling ready (pipeline stage 3)");

    }, 250);

}

/**
 * Handles export.
 */
async function handleExport() {

    setStatus(STATUS.PROCESSING);

    setTimeout(() => {

        setStatus("Export ready (pipeline stage 4)");

    }, 250);

}

/**
 * Handles load category.
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
 * Handles frame click selection.
 */
function handleFrameClick(event) {

    const item = event.target.closest("li");

    if (!item) return;

    const index = Number(item.dataset.index);

    if (isNaN(index)) return;

    state.currentFrameIndex = index;

    const frame = state.frames[index];

    if (!frame) return;

    drawFrame(frame.image);
}

/**
 * Start app.
 */
initializeApplication();
