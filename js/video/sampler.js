/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/video/sampler.js
 * ============================================================================
 *
 * Video frame sampling module.
 *
 * Responsible for:
 * - Extracting frames from video
 * - Producing time-based samples
 */

import { state } from "../state.js";

import { VIDEO } from "../constants.js";

/**
 * Samples frames from a video at fixed intervals.
 *
 * @param {HTMLVideoElement} video
 * @param {number} intervalSeconds
 * @returns {Promise<Array<{time:number, image:HTMLCanvasElement}>>}
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

    let currentTime = 0;

    while (currentTime < duration) {

        video.currentTime = currentTime;

        await new Promise(resolve => {

            video.onseeked = () => resolve();

        });

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frameCanvas = document.createElement("canvas");
        const frameCtx = frameCanvas.getContext("2d");

        frameCanvas.width = canvas.width;
        frameCanvas.height = canvas.height;

        frameCtx.drawImage(canvas, 0, 0);

        frames.push({
            time: currentTime,
            image: frameCanvas
        });

        currentTime += interval;

    }

    state.frames = frames;

    return frames;

}
