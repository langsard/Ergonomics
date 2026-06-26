/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0003
 * File       : js/state.js
 * ============================================================================
 *
 * Global application state (extended for pose interpretation).
 */

import {
    LOAD,
    REVIEW
} from "./constants.js";

export const state = {

    files: [],
    frames: [],
    currentFrameIndex: -1,

    image: null,
    video: null,

    landmarksOriginal: null,
    landmarksEdited: null,

    /**
     * NEW: Pose interpretation result
     *
     * @type {{
     * back:number,
     * arms:number,
     * legs:number
     * }|null}
     */
    interpretation: null,

    geometry: null,

    owas: null,

    selectedLandmark: -1,

    reviewMode: REVIEW.IDLE,

    loadCategory: LOAD.LIGHT

};

/**
 * Clears analysis state (keeps loaded files).
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
 * Resets full application state.
 */
export function resetApplication() {

    state.files = [];

    state.frames = [];

    state.loadCategory = LOAD.LIGHT;

    resetAnalysis();

}
