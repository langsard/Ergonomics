/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/renderer/overlay.js
 * ============================================================================
 *
 * Overlay rendering module.
 *
 * Responsible for:
 * - Drawing landmarks
 * - Drawing skeleton connections
 * - Highlighting selections
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
 * Determines landmark color by confidence.
 *
 * @param {number} confidence
 * @returns {string}
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
 *
 * @param {{x:number,y:number,visibility?:number}} landmark
 */
export function drawLandmark(landmark) {

    if (!ctx || !landmark) {
        return;
    }

    const confidence = landmark.visibility ?? 1;

    const color = getLandmarkColor(confidence);

    const point = toCanvasPoint(landmark);

    ctx.beginPath();

    ctx.arc(
        point.x,
        point.y,
        5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = color;

    ctx.fill();

}

/**
 * Draws all landmarks.
 *
 * @param {Array} landmarks
 */
export function drawLandmarks(landmarks) {

    if (!Array.isArray(landmarks)) {
        return;
    }

    for (const landmark of landmarks) {

        drawLandmark(landmark);

    }

}

/**
 * Highlights selected landmark.
 *
 * @param {{x:number,y:number}} landmark
 */
export function highlightLandmark(landmark) {

    if (!ctx || !landmark) {
        return;
    }

    const point = toCanvasPoint(landmark);

    ctx.beginPath();

    ctx.arc(
        point.x,
        point.y,
        10,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = COLORS.LANDMARK_SELECTED;

    ctx.lineWidth = 3;

    ctx.stroke();

}
