/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/geometry.js
 * ============================================================================
 *
 * Pure geometric computation module.
 *
 * This module MUST NOT contain:
 * - OWAS logic
 * - pose interpretation
 * - rendering
 * - UI logic
 */

import { isFiniteNumber } from "./utils.js";

/**
 * Represents a 2D point.
 *
 * @typedef {{x:number,y:number}} Point
 */

/**
 * Computes Euclidean distance between two points.
 *
 * @param {Point} a
 * @param {Point} b
 * @returns {number}
 */
export function distance(a, b) {

    return Math.sqrt(
        Math.pow(b.x - a.x, 2) +
        Math.pow(b.y - a.y, 2)
    );

}

/**
 * Computes vector from A to B.
 *
 * @param {Point} a
 * @param {Point} b
 * @returns {Point}
 */
export function vector(a, b) {

    return {
        x: b.x - a.x,
        y: b.y - a.y
    };

}

/**
 * Dot product of two vectors.
 *
 * @param {Point} a
 * @param {Point} b
 * @returns {number}
 */
export function dot(a, b) {

    return a.x * b.x + a.y * b.y;

}

/**
 * Vector magnitude.
 *
 * @param {Point} v
 * @returns {number}
 */
export function magnitude(v) {

    return Math.sqrt(
        v.x * v.x + v.y * v.y
    );

}

/**
 * Normalizes a vector.
 *
 * @param {Point} v
 * @returns {Point}
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
 * Computes angle ABC (in degrees).
 *
 * @param {Point} a
 * @param {Point} b
 * @param {Point} c
 * @returns {number}
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
 * Midpoint between two points.
 *
 * @param {Point} a
 * @param {Point} b
 * @returns {Point}
 */
export function midpoint(a, b) {

    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    };

}
