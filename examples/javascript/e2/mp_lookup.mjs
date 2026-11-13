import { bench } from "./mp_bench.mjs";

const ids = Array.from({ length: 10_000 }, (_, i) => i * 7);
const idSet = new Set(ids);
const probe = (i) => (i * 7919) % 70_000;

const array = bench((i) => ids.includes(probe(i)));
const set = bench((i) => idSet.has(probe(i)));

console.log("same answers:",
  ids.includes(probe(3)) === idSet.has(probe(3)));
console.log("Set median over 10x faster:", set.median * 10 < array.median);
