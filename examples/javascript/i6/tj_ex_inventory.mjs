// @ts-check

/** @param {string[]} names */
function count(names) {
  return names.length;
}
console.log(count(["Ada", "Alan"]));

/** @type {Map<string, number>} */
const stock = new Map();
stock.set("pen", 12);

/** @param {number} id */
const label = (id) => `#${id}`;
console.log(label(7), stock.get("pen"));
