import { createRequire } from "node:module";
import legacy, { add } from "./legacy_math.cjs";

console.log(legacy.label, add(1, 2), legacy.square(3));

const require = createRequire(import.meta.url);
const again = require("./legacy_math.cjs");
console.log(again === legacy);
