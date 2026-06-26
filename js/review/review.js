/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/review/review.js
 * ============================================================================
 *
 * Review UI controller.
 *
 * Responsible for:
 * - Displaying selected landmark info
 * - Updating review panel state
 */

import { state } from "../state.js";

import { ELEMENTS } from "../constants.js";

import { getElement } from "../utils.js";

/**
 * Initializes review panel.
 */
export function initializeReview() {

    render();

}

/**
 * Updates review UI.
 */
export function render() {

    const element = getElement(ELEMENTS.SELECTED_LANDMARK);

    if (state.selectedLandmark < 0) {

        element.textContent = "No landmark selected";

        return;

    }

    element.textContent =
        `Selected landmark: ${state.selectedLandmark}`;

}

/**
 * Forces UI refresh.
 */
export function refreshReview() {

    render();

}
