/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0002
 * File       : js/scoring/owas.js
 * ============================================================================
 *
 * OWAS scoring module (refined rules).
 *
 * Updates:
 * - Slightly more structured classification logic
 * - Prepared for pose interpretation integration
 */

import { state } from "../state.js";

import { LOAD } from "../constants.js";

/**
 * Maps load category to OWAS load score.
 */
function mapLoad(loadCategory) {

    switch (loadCategory) {

        case LOAD.LIGHT:
            return 1;

        case LOAD.MEDIUM:
            return 2;

        case LOAD.HEAVY:
            return 3;

        default:
            return 1;

    }

}

/**
 * Computes OWAS classification.
 */
export function evaluateOWAS() {

    const load = mapLoad(state.loadCategory);

    const interpretation = state.interpretation;

    /**
     * Base posture classification.
     *
     * NOTE:
     * Interpretation module will later define:
     * - back posture
     * - arm position
     * - leg position
     */
    const back = interpretation?.back || 1;
    const arms = interpretation?.arms || 1;
    const legs = interpretation?.legs || 1;

    const code = `${back}${arms}${legs}${load}`;

    /**
     * Basic rule-based escalation.
     */
    let actionCategory = 1;

    if (load === 3) {
        actionCategory = 3;
    }

    if (back >= 3) {
        actionCategory = Math.max(actionCategory, 3);
    }

    let verdict = "Acceptable posture";

    if (actionCategory === 3) {
        verdict = "Corrective action required soon";
    } else if (actionCategory === 2) {
        verdict = "Corrective action required in near future";
    }

    const result = {
        back,
        arms,
        legs,
        load,
        code,
        actionCategory,
        verdict,
        explanation:
            "OWAS classification based on current interpretation state."
    };

    state.owas = result;

    return result;

}
