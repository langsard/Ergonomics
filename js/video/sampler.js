/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0002
 * File       : js/video/sampler.js
 * ============================================================================
 *
 * Video frame sampling module (enhanced).
 *
 * Updates:
 * - Safer seek handling
 * - Deterministic frame extraction
 * - Reduced race conditions
 */

import { state } from "../state.js";

import { VIDEO } from "../constants.js";

/**
 * Waits for video seek completion.
 *
 * @param {HTMLVideoElement} video
 * @returns {Promise<void>}
 */
function waitForSeek(video) {

    return new Promise(resolve => {

        const handler = () => {

            video.removeEventListener("seeked", handler);

            resolve();

        };

        video.addEventListener("seeked", handler);

    });

}

/**
 * Samples frames from a video.
 *
 * @param {HTMLVideoElement} video
 * @param {number} intervalSeconds
 */
export async function sampleVideo(video, intervalSeconds) {

    const interval =
        intervalSeconds || VIDEO.DEFAULT_INTERVAL;

    const frames = [];

    const duration = video.duration || 0;

    if (!duration || !isFinite(duration)) {
        return frames;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let time = 0;

    while (time < duration) {

        video.currentTime = time;

        await waitForSeek(video);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frame = document.createElement("canvas");
        const fctx = frame.getContext("2d");

        frame.width = canvas.width;
        frame.height = canvas.height;

        fctx.drawImage(canvas, 0, 0);

        frames.push({
            time,
            image: frame
        });

        time += interval;

    }

    state.frames = frames;

    return frames;

}
