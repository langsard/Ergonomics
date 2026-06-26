/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/state.js
 * ============================================================================
 *
 * Global application state.
 *
 * This module is the single source of truth for runtime state.
 * State values may be modified by other modules, but the state
 * object itself must never be replaced.
 */

import {
    LOAD,
    REVIEW
} from "./constants.js";

/**
 * Global application state.
 */
export const state = {

    /**
     * Files selected by the user.
     *
     * @type {File[]}
     */
    files: [],

    /**
     * Sampled frames.
     *
     * Each entry will be populated by the
     * video sampling module.
     *
     * @type {Array}
     */
    frames: [],

    /**
     * Currently selected frame index.
     *
     * -1 indicates no frame selected.
     *
     * @type {number}
     */
    currentFrameIndex: -1,

    /**
     * Current source image.
     *
     * @type {HTMLImageElement|null}
     */
    image: null,

    /**
     * Current source video.
     *
     * @type {HTMLVideoElement|null}
     */
    video: null,

    /**
     * Original landmarks returned by MediaPipe.
     *
     * Never modified.
     *
     * @type {Array|null}
     */
    landmarksOriginal: null,

    /**
     * User edited landmarks.
     *
     * Initially identical to landmarksOriginal
     * but may diverge during manual review.
     *
     * @type {Array|null}
     */
    landmarksEdited: null,

    /**
     * Cached geometry values.
     *
     * Geometry module owns this object.
     *
     * @type {Object|null}
     */
    geometry: null,

    /**
     * Cached pose interpretation.
     *
     * Interpretation module owns this object.
     *
     * @type {Object|null}
     */
    interpretation: null,

    /**
     * Cached OWAS result.
     *
     * @type {Object|null}
     */
    owas: null,

    /**
     * Selected landmark index.
     *
     * -1 indicates none selected.
     *
     * @type {number}
     */
    selectedLandmark: -1,

    /**
     * Current review mode.
     *
     * @type {string}
     */
    reviewMode: REVIEW.IDLE,

    /**
     * Selected manual load category.
     *
     * @type {number}
     */
    loadCategory: LOAD.LIGHT

};

/**
 * Clears all analysis results while preserving
 * loaded files and user preferences.
 */
export function resetAnalysis() {

    state.currentFrameIndex = -1;

    state.image = null;

    state.video = null;

    state.landmarksOriginal = null;

    state.landmarksEdited = null;

    state.geometry = null;

    state.interpretation = null;

    state.owas = null;

    state.selectedLandmark = -1;

    state.reviewMode = REVIEW.IDLE;

}

/**
 * Clears the complete application state.
 */
export function resetApplication() {

    state.files = [];

    state.frames = [];

    state.loadCategory = LOAD.LIGHT;

    resetAnalysis();

}
