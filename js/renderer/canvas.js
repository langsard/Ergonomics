/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0002
 * File       : js/renderer/canvas.js
 * ============================================================================
 *
 * Canvas rendering core (extended).
 *
 * Adds:
 * - Frame scaling preservation
 * - Image aspect ratio fitting
 * - Render metadata tracking
 */

import { CANVAS } from "../constants.js";

import { getElement } from "../utils.js";

let canvas = null;
let ctx = null;

let currentWidth = CANVAS.WIDTH;
let currentHeight = CANVAS.HEIGHT;

/**
 * Initializes canvas context.
 */
export function initializeCanvas() {

    canvas = getElement("imageCanvas");

    ctx = canvas.getContext("2d");

    resizeCanvas(CANVAS.WIDTH, CANVAS.HEIGHT);

}

/**
 * Resizes canvas.
 */
export function resizeCanvas(width, height) {

    currentWidth = width;
    currentHeight = height;

    canvas.width = width;
    canvas.height = height;

}

/**
 * Clears canvas.
 */
export function clearCanvas() {

    ctx.clearRect(0, 0, currentWidth, currentHeight);

}

/**
 * Draws frame with aspect ratio preservation.
 *
 * @param {CanvasImageSource} source
 */
export function drawFrame(source) {

    clearCanvas();

    if (!source) return;

    const sourceWidth =
        source.videoWidth ||
        source.width;

    const sourceHeight =
        source.videoHeight ||
        source.height;

    if (!sourceWidth || !sourceHeight) {

        ctx.drawImage(source, 0, 0, currentWidth, currentHeight);

        return;

    }

    const scale = Math.min(
        currentWidth / sourceWidth,
        currentHeight / sourceHeight
    );

    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;

    const offsetX = (currentWidth - drawWidth) / 2;
    const offsetY = (currentHeight - drawHeight) / 2;

    ctx.drawImage(
        source,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
    );

}

/**
 * Returns canvas.
 */
export function getCanvas() {

    return canvas;
}

/**
 * Returns context.
 */
export function getContext() {

    return ctx;
}

/**
 * Converts normalized point to canvas space.
 */
export function toCanvasPoint(point) {

    return {
        x: point.x * currentWidth,
        y: point.y * currentHeight
    };
}

/**
 * Returns canvas size.
 */
export function getCanvasSize() {

    return {
        width: currentWidth,
        height: currentHeight
    };
}
