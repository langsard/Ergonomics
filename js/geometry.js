/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0003
 * File       : js/geometry.js
 * ============================================================================
 *
 * Pure geometric computation module (extended).
 *
 * Updates:
 * - Added angle stability helpers
 * - Added robust coordinate validation utilities
 */

import { isFiniteNumber } from "./utils.js";

/**
 * Represents a 2D point.
 *
 * @typedef {{x:number,y:number}} Point
 */

function isValidPoint(p) {

    return p &&
        isFiniteNumber(p.x) &&
        isFiniteNumber(p.y);

}

/**
 * Computes Euclidean distance.
 */
export function distance(a, b) {

    if (!isValidPoint(a) || !isValidPoint(b)) {
        return 0;
    }

    return Math.sqrt(
        Math.pow(b.x - a.x, 2) +
        Math.pow(b.y - a.y, 2)
    );

}

/**
 * Vector from A to B.
 */
export function vector(a, b) {

    if (!isValidPoint(a) || !isValidPoint(b)) {
        return { x: 0, y: 0 };
    }

    return {
        x: b.x - a.x,
        y: b.y - a.y
    };

}

/**
 * Dot product.
 */
export function dot(a, b) {

    return a.x * b.x + b.y * a.y;
}

/**
 * Magnitude.
 */
export function magnitude(v) {

    return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * Normalize vector.
 */
export function normalize(v) {

    const mag = magnitude(v);

    if (!isFiniteNumber(mag) || mag === 0) {
        return { x: 0, y: 0 };
    }

    return {
        x: v.x / mag,
        y: v.y / mag
    };

}

/**
 * Angle ABC in degrees.
 */
export function angleABC(a, b, c) {

    const ba = vector(b, a);
    const bc = vector(b, c);

    const nba = normalize(ba);
    const nbc = normalize(bc);

    let cosine = dot(nba, nbc);

    cosine = Math.max(-1, Math.min(1, cosine));

    return Math.acos(cosine) * (180 / Math.PI);

}

/**
 * Midpoint.
 */
export function midpoint(a, b) {

    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    };

}
