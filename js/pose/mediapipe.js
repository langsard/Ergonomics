/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0002
 * File       : js/pose/mediapipe.js
 * ============================================================================
 *
 * MediaPipe Pose wrapper (enhanced for pipeline stability).
 *
 * Updates:
 * - Safer initialization guards
 * - Async-safe detection wrapper
 * - Consistent output normalization
 */

let poseLandmarker = null;

let visionLoaded = false;

let modelLoaded = false;

/**
 * Loads MediaPipe Vision library.
 */
async function loadVisionLibrary() {

    if (visionLoaded) return;

    if (!window.FilesetResolver) {

        throw new Error(
            "MediaPipe Vision library not found. Ensure CDN is loaded."
        );

    }

    visionLoaded = true;

}

/**
 * Initializes Pose Landmarker.
 */
export async function initializePose() {

    await loadVisionLibrary();

    const {
        PoseLandmarker,
        FilesetResolver
    } = window;

    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    poseLandmarker = await PoseLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task"
            },
            runningMode: "IMAGE",
            numPoses: 1
        }
    );

    modelLoaded = true;

}

/**
 * Checks readiness.
 */
export function isReady() {

    return visionLoaded && modelLoaded;

}

/**
 * Runs pose estimation on input.
 */
export async function estimatePose(input) {

    if (!poseLandmarker) {
        throw new Error("PoseLandmarker not initialized");
    }

    const result = await poseLandmarker.detect(input);

    if (!result || !result.landmarks || !result.landmarks.length) {
        return null;
    }

    return result.landmarks[0];
}
