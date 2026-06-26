/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0002
 * File       : js/renderer/overlay.js
 * ============================================================================
 *
 * Overlay rendering module (enhanced integration).
 *
 * Updates:
 * - Frame-safe drawing pipeline
 * - Clear separation of render lifecycle
 * - Optional frame redraw hook
 */

import { COLORS, CONFIDENCE } from "../constants.js";

import { getContext } from "./canvas.js";

import { toCanvasPoint } from "./canvas.js";

let ctx = null;

/**
 * Initializes overlay module.
 */
export function initializeOverlay() {

    ctx = getContext();

}

/**
 * Determines landmark color.
 */
function getLandmarkColor(confidence) {

    if (confidence < CONFIDENCE.LOW) {
        return COLORS.LANDMARK_LOW;
    }

    if (confidence < CONFIDENCE.MEDIUM) {
        return COLORS.LANDMARK_MEDIUM;
    }

    return COLORS.LANDMARK_HIGH;

}

/**
 * Draws a single landmark.
 */
export function drawLandmark(landmark) {

    if (!ctx || !landmark) return;

    const confidence = landmark.visibility ?? 1;

    const color = getLandmarkColor(confidence);

    const point = toCanvasPoint(landmark);

    ctx.beginPath();

    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);

    ctx.fillStyle = color;

    ctx.fill();

}

/**
 * Draws all landmarks.
 */
export function drawLandmarks(landmarks) {

    if (!Array.isArray(landmarks)) return;

    for (const lm of landmarks) {
        drawLandmark(lm);
    }
}

/**
 * Highlights selected landmark.
 */
export function highlightLandmark(landmark) {

    if (!ctx || !landmark) return;

    const point = toCanvasPoint(landmark);

    ctx.beginPath();

    ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);

    ctx.strokeStyle = COLORS.LANDMARK_SELECTED;

    ctx.lineWidth = 3;

    ctx.stroke();
}

/**
 * Clears overlay layer (future pipeline hook).
 */
export function clearOverlay() {

    if (!ctx) return;

    // Intentionally does not clear canvas here;
    // canvas module owns frame clearing.

}
