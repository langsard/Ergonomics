/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0004
 * File       : js/review/editor.js
 * ============================================================================
 *
 * Manual landmark editing module (enhanced controller support).
 *
 * Updates:
 * - Supports controller-driven updates
 * - Ensures original landmarks remain immutable
 * - Triggers state refresh-safe edits
 */

import { state } from "../state.js";

import { deepClone } from "../utils.js";

import { REVIEW } from "../constants.js";

/**
 * Initializes editor state.
 */
export function initializeEditor() {

    state.reviewMode = REVIEW.IDLE;

}

/**
 * Selects a landmark.
 */
export function selectLandmark(index) {

    state.selectedLandmark = index;

    state.reviewMode = REVIEW.SELECT_LANDMARK;

}

/**
 * Updates landmark position safely.
 */
export function updateLandmark(x, y) {

    const idx = state.selectedLandmark;

    if (idx < 0) return;

    if (!state.landmarksOriginal) return;

    if (!state.landmarksEdited) {

        state.landmarksEdited = deepClone(state.landmarksOriginal);

    }

    const target = state.landmarksEdited[idx];

    if (!target) return;

    state.landmarksEdited[idx] = {

        ...target,

        x,
        y

    };

}

/**
 * Clears selection.
 */
export function clearSelection() {

    state.selectedLandmark = -1;

    state.reviewMode = REVIEW.IDLE;

}
