/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/review/editor.js
 * ============================================================================
 *
 * Manual landmark editing module.
 *
 * Responsible for:
 * - Selecting landmarks
 * - Updating landmark positions
 * - Maintaining original vs edited separation
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
 * Selects a landmark for editing.
 *
 * @param {number} index
 */
export function selectLandmark(index) {

    state.selectedLandmark = index;

    state.reviewMode = REVIEW.SELECT_LANDMARK;

}

/**
 * Applies updated coordinates to selected landmark.
 *
 * @param {number} x
 * @param {number} y
 */
export function updateLandmark(x, y) {

    const idx = state.selectedLandmark;

    if (idx < 0) {
        return;
    }

    if (!state.landmarksOriginal) {
        return;
    }

    if (!state.landmarksEdited) {

        state.landmarksEdited =
            deepClone(state.landmarksOriginal);

    }

    state.landmarksEdited[idx] = {

        ...state.landmarksEdited[idx],

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
