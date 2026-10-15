import { shuffle } from "./shuffle.mjs";

const original = [1, 2, 3, 4, 5];

const fixed = shuffle(original, () => 0);
console.log(fixed, original);

const real = shuffle(original);
console.log(real.length, [...real].sort().join(""));
