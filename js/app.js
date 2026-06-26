/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/app.js
 * ============================================================================
 *
 * Application bootstrap and event wiring.
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

import { state, resetAnalysis } from "./state.js";

/**
 * Application entry point.
 */
function initializeApplication() {

    wireUIEvents();

    setReadyStatus();

}

/**
 * Wires all UI event listeners.
 */
function wireUIEvents() {

    /**
     * File input handler.
     */
    getElement(ELEMENTS.FILE_INPUT)
        .addEventListener("change", handleFileInput);

    /**
     * Sampling button handler.
     */
    getElement(ELEMENTS.SAMPLE_BUTTON)
        .addEventListener("click", handleSampling);

    /**
     * Export PDF handler.
     */
    getElement(ELEMENTS.EXPORT_BUTTON)
        .addEventListener("click", handleExport);

    /**
     * Load category selector.
     */
    document
        .querySelectorAll(
            `input[name="${ELEMENTS.LOAD_RADIO_NAME}"]`
        )
        .forEach(radio => {

            radio.addEventListener(
                "change",
                handleLoadChange
            );

        });

}

/**
 * Handles file input (images/videos).
 *
 * @param {Event} event
 */
async function handleFileInput(event) {

    const files = Array.from(
        event.target.files || []
    );

    state.files = files;

    setStatus(
        `${files.length} file(s) loaded`
    );

    resetAnalysis();

    if (files.length === 0) {
        return;
    }

    const first = files[0];

    if (first.type.startsWith("image/")) {

        state.image = await loadImage(first);

        setStatus(STATUS.READY);

    } else if (first.type.startsWith("video/")) {

        state.video = await loadVideo(first);

        setStatus(STATUS.READY);

    }

}

/**
 * Handles video sampling request.
 */
async function handleSampling() {

    if (!state.video) {

        setStatus("No video loaded");

        return;

    }

    setStatus(STATUS.PROCESSING);

    // Sampling logic implemented in later commits.
    setTimeout(() => {

        setStatus("Sampling not yet implemented");

    }, 300);

}

/**
 * Handles PDF export.
 */
async function handleExport() {

    setStatus(STATUS.PROCESSING);

    // PDF module implemented in later commit.

    setTimeout(() => {

        setStatus("Export not yet implemented");

    }, 300);

}

/**
 * Handles load category change.
 *
 * @param {Event} event
 */
function handleLoadChange(event) {

    const value = Number(event.target.value);

    if (value === LOAD.LIGHT ||
        value === LOAD.MEDIUM ||
        value === LOAD.HEAVY
    ) {

        state.loadCategory = value;

    }

}

/**
 * Start application.
 */
initializeApplication();
