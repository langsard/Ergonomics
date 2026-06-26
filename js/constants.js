/**
 * ============================================================================
 * Sit Tight
 * Repository : Ergonomics
 * Commit     : 0001
 * File       : js/constants.js
 * ============================================================================
 *
 * Application-wide immutable constants.
 */

/**
 * Application information.
 */
export const APPLICATION = Object.freeze({

    NAME: "Sit Tight",

    VERSION: "1.0.0"

});

/**
 * Default canvas size.
 *
 * Canvas will be resized by the renderer when required,
 * but these values define the initial working resolution.
 */
export const CANVAS = Object.freeze({

    WIDTH: 1280,

    HEIGHT: 720

});

/**
 * Landmark confidence thresholds.
 */
export const CONFIDENCE = Object.freeze({

    LOW: 0.10,

    MEDIUM: 0.30

});

/**
 * Overlay colours.
 */
export const COLORS = Object.freeze({

    LANDMARK_LOW: "#ff0000",

    LANDMARK_MEDIUM: "#ffd400",

    LANDMARK_HIGH: "#00b050",

    LANDMARK_SELECTED: "#00ffff",

    SKELETON: "#ffffff",

    TEXT: "#ffffff"

});

/**
 * Supported file extensions.
 */
export const FILE_TYPES = Object.freeze({

    IMAGE: Object.freeze([
        ".jpg",
        ".jpeg",
        ".png",
        ".bmp",
        ".webp"
    ]),

    VIDEO: Object.freeze([
        ".mp4",
        ".mov",
        ".avi",
        ".mkv",
        ".webm"
    ])

});

/**
 * Default video sampling configuration.
 */
export const VIDEO = Object.freeze({

    DEFAULT_INTERVAL: 1,

    MIN_INTERVAL: 0.1

});

/**
 * Manual load categories.
 */
export const LOAD = Object.freeze({

    LIGHT: 1,

    MEDIUM: 2,

    HEAVY: 3

});

/**
 * Review modes.
 */
export const REVIEW = Object.freeze({

    IDLE: "idle",

    SELECT_LANDMARK: "select-landmark",

    PLACE_LANDMARK: "place-landmark"

});

/**
 * DOM element identifiers.
 */
export const ELEMENTS = Object.freeze({

    FILE_INPUT: "fileInput",

    SAMPLE_BUTTON: "sampleFramesButton",

    SAMPLE_INTERVAL: "samplingInterval",

    FRAME_LIST: "frameList",

    CANVAS: "imageCanvas",

    EXPORT_BUTTON: "exportPdfButton",

    LOAD_RADIO_NAME: "loadCategory",

    STATUS: "applicationStatus",

    OWAS_RESULT: "owasResult",

    SELECTED_LANDMARK: "selectedLandmark"

});

/**
 * UI text.
 */
export const STATUS = Object.freeze({

    READY: "Ready",

    LOADING: "Loading...",

    PROCESSING: "Processing...",

    ERROR: "Error"

});
