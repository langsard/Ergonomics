/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/renderer/canvas.js
 * ============================================================================
 *
 * Canvas rendering core.
 *
 * Responsible for:
 * - Canvas initialization
 * - Image/video rendering
 * - Coordinate scaling helpers
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

    resizeCanvas(
        CANVAS.WIDTH,
        CANVAS.HEIGHT
    );

}

/**
 * Resizes canvas.
 *
 * @param {number} width
 * @param {number} height
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

    ctx.clearRect(
        0,
        0,
        currentWidth,
        currentHeight
    );

}

/**
 * Draws an image or video frame.
 *
 * @param {CanvasImageSource} source
 */
export function drawFrame(source) {

    clearCanvas();

    ctx.drawImage(
        source,
        0,
        0,
        currentWidth,
        currentHeight
    );

}

/**
 * Returns canvas element.
 *
 * @returns {HTMLCanvasElement}
 */
export function getCanvas() {

    return canvas;

}

/**
 * Returns rendering context.
 *
 * @returns {CanvasRenderingContext2D}
 */
export function getContext() {

    return ctx;

}

/**
 * Converts normalized coordinates (0–1)
 * into canvas coordinates.
 *
 * @param {{x:number,y:number}} point
 * @returns {{x:number,y:number}}
 */
export function toCanvasPoint(point) {

    return {
        x: point.x * currentWidth,
        y: point.y * currentHeight
    };

}

/**
 * Gets current canvas size.
 *
 * @returns {{width:number,height:number}}
 */
export function getCanvasSize() {

    return {
        width: currentWidth,
        height: currentHeight
    };

}
