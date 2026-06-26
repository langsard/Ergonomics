/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/utils.js
 * ============================================================================
 *
 * General-purpose utility functions.
 *
 * This module contains reusable helper functions only.
 * It must not contain application logic, geometry,
 * MediaPipe, OWAS, rendering, or PDF functionality.
 */

import {
    ELEMENTS,
    STATUS
} from "./constants.js";

/**
 * Returns a DOM element by its identifier.
 *
 * @param {string} id
 * @returns {HTMLElement}
 * @throws {Error} If the element does not exist.
 */
export function getElement(id) {

    const element = document.getElementById(id);

    if (!element) {

        throw new Error(`Element not found: ${id}`);

    }

    return element;

}

/**
 * Updates the application status text.
 *
 * @param {string} message
 */
export function setStatus(message) {

    getElement(ELEMENTS.STATUS).textContent = message;

}

/**
 * Sets the application to the default ready state.
 */
export function setReadyStatus() {

    setStatus(STATUS.READY);

}

/**
 * Deep clones a structured object.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function deepClone(value) {

    return structuredClone(value);

}

/**
 * Restricts a value to the specified range.
 *
 * @param {number} value
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
export function clamp(
    value,
    minimum,
    maximum
) {

    return Math.min(
        Math.max(value, minimum),
        maximum
    );

}

/**
 * Tests whether a value is a finite number.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isFiniteNumber(value) {

    return Number.isFinite(value);

}

/**
 * Creates an HTML element.
 *
 * @param {string} tagName
 * @param {Object} [properties]
 * @returns {HTMLElement}
 */
export function createElement(
    tagName,
    properties = {}
) {

    const element = document.createElement(tagName);

    Object.assign(
        element,
        properties
    );

    return element;

}

/**
 * Removes all children from a DOM element.
 *
 * @param {HTMLElement} element
 */
export function clearElement(element) {

    while (element.firstChild) {

        element.removeChild(
            element.firstChild
        );

    }

}

/**
 * Formats a number using a fixed number of decimals.
 *
 * @param {number} value
 * @param {number} [digits=1]
 * @returns {string}
 */
export function formatNumber(
    value,
    digits = 1
) {

    if (!isFiniteNumber(value)) {

        return "-";

    }

    return value.toFixed(digits);

}

/**
 * Loads an image from a File object.
 *
 * @param {File} file
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(file) {

    return new Promise((resolve, reject) => {

        const image = new Image();

        const url = URL.createObjectURL(file);

        image.onload = () => {

            URL.revokeObjectURL(url);

            resolve(image);

        };

        image.onerror = () => {

            URL.revokeObjectURL(url);

            reject(
                new Error(
                    "Unable to load image."
                )
            );

        };

        image.src = url;

    });

}

/**
 * Loads a video from a File object.
 *
 * @param {File} file
 * @returns {Promise<HTMLVideoElement>}
 */
export function loadVideo(file) {

    return new Promise((resolve, reject) => {

        const video = document.createElement("video");

        const url = URL.createObjectURL(file);

        video.preload = "auto";

        video.onloadeddata = () => {

            URL.revokeObjectURL(url);

            resolve(video);

        };

        video.onerror = () => {

            URL.revokeObjectURL(url);

            reject(
                new Error(
                    "Unable to load video."
                )
            );

        };

        video.src = url;

    });

}
