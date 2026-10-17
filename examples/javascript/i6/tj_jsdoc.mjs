// @ts-check

/**
 * @template T
 * @param {T[]} items
 * @param {(item: T) => boolean} test
 * @returns {T | undefined}
 */
export function findFirst(items, test) {
  for (const item of items) {
    if (test(item)) return item;
  }
  return undefined;
}

/** @type {Map<string, number>} */
const stock = new Map([["pen", 12], ["ink", 0]]);

/** @param {string | number} id */
function label(id) {
  return typeof id === "number" ? `#${id}` : id.toUpperCase();
}

console.log(findFirst([...stock], ([, count]) => count === 0));
console.log(label(7), label("abc"));
