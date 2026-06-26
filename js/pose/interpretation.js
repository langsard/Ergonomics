/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0003
 * File       : js/pose/interpretation.js
 * ============================================================================
 *
 * Pose interpretation engine.
 *
 * Responsible ONLY for converting raw landmarks into:
 * - back posture classification
 * - arm posture classification
 * - leg posture classification
 *
 * This module MUST NOT:
 * - compute OWAS
 * - perform UI logic
 * - draw anything
 * - modify global state directly
 */

import {
    angleABC,
    distance
} from "../geometry.js";

/**
 * Extract safe landmark point.
 */
function p(lm) {

    return lm ? { x: lm.x, y: lm.y } : null;

}

/**
 * Determines if trunk is bent forward.
 */
function detectBackPosture(landmarks) {

    const shoulderL = p(landmarks[11]);
    const shoulderR = p(landmarks[12]);
    const hipL = p(landmarks[23]);
    const hipR = p(landmarks[24]);

    if (!shoulderL || !shoulderR || !hipL || !hipR) {
        return 1;
    }

    const midShoulder = {
        x: (shoulderL.x + shoulderR.x) / 2,
        y: (shoulderL.y + shoulderR.y) / 2
    };

    const midHip = {
        x: (hipL.x + hipR.x) / 2,
        y: (hipL.y + hipR.y) / 2
    };

    const verticalDeviation =
        Math.abs(midShoulder.x - midHip.x);

    if (verticalDeviation > 0.15) {
        return 3;
    }

    return 1;
}

/**
 * Determines arm posture.
 */
function detectArmPosture(landmarks) {

    const shoulder = p(landmarks[11]);
    const elbow = p(landmarks[13]);
    const wrist = p(landmarks[15]);

    if (!shoulder || !elbow || !wrist) {
        return 1;
    }

    const angle = angleABC(shoulder, elbow, wrist);

    if (angle > 150) return 1;
    if (angle > 90) return 2;

    return 3;
}

/**
 * Determines leg posture.
 */
function detectLegPosture(landmarks) {

    const hip = p(landmarks[23]);
    const knee = p(landmarks[25]);
    const ankle = p(landmarks[27]);

    if (!hip || !knee || !ankle) {
        return 1;
    }

    const angle = angleABC(hip, knee, ankle);

    if (angle > 160) return 1;
    if (angle > 100) return 2;

    return 3;
}

/**
 * Interprets full pose.
 *
 * @param {Array} landmarks
 * @returns {{
 * back:number,
 * arms:number,
 * legs:number
 * }}
 */
export function interpretPose(landmarks) {

    if (!Array.isArray(landmarks)) {

        return {
            back: 1,
            arms: 1,
            legs: 1
        };

    }

    return {

        back: detectBackPosture(landmarks),

        arms: detectArmPosture(landmarks),

        legs: detectLegPosture(landmarks)

    };

}
