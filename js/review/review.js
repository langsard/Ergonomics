/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0004
 * File       : js/review/review.js
 * ============================================================================
 *
 * Review UI controller (enhanced).
 *
 * Updates:
 * - Reflects edited landmark state
 * - Shows selection + edit mode status
 * - Supports real-time refresh hooks
 */

import { state } from "../state.js";

import { ELEMENTS, REVIEW } from "../constants.js";

import { getElement } from "../utils.js";

/**
 * Initializes review panel.
 */
export function initializeReview() {

    render();

}

/**
 * Renders review panel state.
 */
export function render() {

    const el = getElement(ELEMENTS.SELECTED_LANDMARK);

    if (state.selectedLandmark < 0) {

        el.textContent = "No landmark selected";

        return;

    }

    const idx = state.selectedLandmark;

    const mode = state.reviewMode;

    const hasEdit = !!state.landmarksEdited;

    const lm =
        (state.landmarksEdited && state.landmarksEdited[idx]) ||
        (state.landmarksOriginal && state.landmarksOriginal[idx]);

    el.textContent =
        `Landmark: ${idx} | Mode: ${mode} | ` +
        `X: ${lm?.x?.toFixed?.(3) ?? "?"} ` +
        `Y: ${lm?.y?.toFixed?.(3) ?? "?"}` +
        (hasEdit ? " (edited)" : "");
}

/**
 * Forces UI refresh.
 */
export function refreshReview() {

    render();

}
