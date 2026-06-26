/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/scoring/owas.js
 * ============================================================================
 *
 * OWAS scoring module (initial implementation).
 *
 * Responsible for:
 * - Converting pose interpretation + load input
 *   into OWAS classification
 *
 * This module must NOT:
 * - compute geometry
 * - interpret pose directly
 */

import { state } from "../state.js";

import { LOAD } from "../constants.js";

/**
 * OWAS result structure.
 *
 * @typedef {{
 * back:number,
 * arms:number,
 * legs:number,
 * load:number,
 * code:string,
 * actionCategory:number,
 * verdict:string,
 * explanation:string
 * }} OWASResult
 */

/**
 * Maps load category to OWAS load score.
 *
 * @param {number} loadCategory
 * @returns {number}
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
 * Evaluates OWAS based on current state.
 *
 * NOTE:
 * Pose interpretation module will be added later.
 *
 * @returns {OWASResult}
 */
export function evaluateOWAS() {

    const load = mapLoad(state.loadCategory);

    /**
     * Placeholder structural classification rules.
     *
     * These are minimal deterministic defaults
     * until pose interpretation module is introduced.
     */
    const back = 1;
    const arms = 1;
    const legs = 1;

    const code = `${back}${arms}${legs}${load}`;

    const actionCategory =
        (back > 2 || load === 3)
            ? 3
            : 1;

    let verdict = "Acceptable posture";

    if (actionCategory === 3) {
        verdict = "Corrective action required soon";
    }

    const explanation =
        "OWAS computed from current load category. " +
        "Posture classification will be refined in later commits.";

    const result = {
        back,
        arms,
        legs,
        load,
        code,
        actionCategory,
        verdict,
        explanation
    };

    state.owas = result;

    return result;

}
