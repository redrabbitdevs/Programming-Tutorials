// @ts-check

/**
 * @typedef {object} Rect
 * @property {number} width
 * @property {number} height
 */

/**
 * Area of a rectangle.
 * @param {Rect} rect
 * @returns {number}
 */
export function area(rect) {
  return rect.width * rect.height;
}

/**
 * @param {string[]} names
 * @param {number} [limit] how many names to keep
 * @returns {string}
 */
export function shortList(names, limit = 2) {
  return names.slice(0, limit).join(", ");
}
