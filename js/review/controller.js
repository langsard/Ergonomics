/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0004
 * File       : js/review/controller.js
 * ============================================================================
 *
 * Manual review interaction controller.
 *
 * Responsible for:
 * - Landmark selection via canvas click
 * - Mapping screen coordinates to landmark selection
 * - Triggering edit mode transitions
 *
 * This module does NOT:
 * - modify OWAS
 * - perform geometry computation
 * - render graphics directly
 */

import { state } from "../state.js";

import { REVIEW } from "../constants.js";

import {
    selectLandmark,
    updateLandmark,
    clearSelection
} from "./editor.js";

import { getCanvasSize } from "../renderer/canvas.js";

/**
 * Maps click position to nearest landmark.
 *
 * @param {Array} landmarks
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function findNearestLandmark(landmarks, x, y) {

    let bestIndex = -1;
    let bestDistance = Infinity;

    for (let i = 0; i < landmarks.length; i++) {

        const lm = landmarks[i];

        if (!lm) continue;

        const dx = lm.x - x;
        const dy = lm.y - y;

        const d = dx * dx + dy * dy;

        if (d < bestDistance) {
            bestDistance = d;
            bestIndex = i;
        }

    }

    return bestIndex;
}

/**
 * Converts mouse event to canvas-relative coordinates.
 */
function getCanvasCoordinates(event, canvas) {

    const rect = canvas.getBoundingClientRect();

    const size = getCanvasSize();

    const scaleX = size.width / rect.width;
    const scaleY = size.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };

}

/**
 * Handles canvas click for landmark selection.
 *
 * @param {MouseEvent} event
 * @param {HTMLCanvasElement} canvas
 */
export function handleCanvasClick(event, canvas) {

    if (!state.landmarksOriginal) return;

    const { x, y } = getCanvasCoordinates(event, canvas);

    const index = findNearestLandmark(state.landmarksOriginal, x, y);

    if (index < 0) return;

    selectLandmark(index);

    state.reviewMode = REVIEW.SELECT_LANDMARK;
}

/**
 * Applies landmark edit at click position.
 *
 * @param {MouseEvent} event
 * @param {HTMLCanvasElement} canvas
 */
export function handleCanvasEdit(event, canvas) {

    if (state.selectedLandmark < 0) return;

    const { x, y } = getCanvasCoordinates(event, canvas);

    updateLandmark(x, y);

    state.reviewMode = REVIEW.PLACE_LANDMARK;
}

/**
 * Cancels current selection.
 */
export function cancelSelection() {

    clearSelection();

}
