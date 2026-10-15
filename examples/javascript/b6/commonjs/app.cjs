const path = require("node:path");
const { add, square } = require("./legacy_math.cjs");
const modern = require("./modern.mjs");

console.log(add(2, 3), square(4));
console.log(path.basename(__filename));
console.log(require.main === module);
console.log(typeof exports, typeof module);

console.log(modern.double(21));
console.log(modern.default);
