/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0005
 * File       : js/analysis/statistics.js
 * ============================================================================
 *
 * Analysis statistics module.
 *
 * Responsible for:
 * - Computing summary statistics across frames
 * - Identifying worst posture frame
 * - Aggregating OWAS categories
 *
 * This module MUST NOT:
 * - modify UI
 * - render graphics
 * - mutate global state directly
 */

import { state } from "../state.js";

/**
 * Counts occurrences of OWAS action categories.
 *
 * @param {Array} frames
 * @returns {{1:number,2:number,3:number,4:number}}
 */
function initBucket() {

    return {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };

}

/**
 * Computes worst OWAS frame.
 *
 * @param {Array} frames
 * @returns {{index:number, category:number|null}}
 */
export function computeWorstFrame(frames) {

    let worstIndex = -1;
    let worstCategory = 0;

    for (let i = 0; i < frames.length; i++) {

        const f = frames[i];

        const cat = f?.owas?.actionCategory || 0;

        if (cat > worstCategory) {
            worstCategory = cat;
            worstIndex = i;
        }

    }

    return {
        index: worstIndex,
        category: worstCategory || null
    };

}

/**
 * Aggregates OWAS categories.
 */
export function computeCategoryDistribution(frames) {

    const buckets = initBucket();

    for (const f of frames) {

        const cat = f?.owas?.actionCategory;

        if (cat >= 1 && cat <= 4) {
            buckets[cat]++;
        }

    }

    return buckets;

}

/**
 * Builds full analysis summary.
 */
export function buildAnalysisSummary() {

    const frames = state.frames || [];

    const worst = computeWorstFrame(frames);

    const distribution = computeCategoryDistribution(frames);

    return {

        totalFrames: frames.length,

        worstFrame: worst,

        distribution

    };

}
