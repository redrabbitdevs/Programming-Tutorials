import { setTimeout as sleep } from "node:timers/promises";

const cache = new Map();
const cleanup = new FinalizationRegistry((key) => {
  if (cache.get(key)?.deref() === undefined) cache.delete(key);
});

function remember(key, value) {
  cache.set(key, new WeakRef(value));
  cleanup.register(value, key);
}

let report = { title: "Q1", rows: new Array(10_000).fill(0) };
const chart = { title: "Q2", points: new Array(10_000).fill(0) };
remember("report", report);
remember("chart", chart);
console.log("entries before:", cache.size);

report = null;
await sleep(0);
globalThis.gc();
await sleep(10);
console.log("entries after gc:", cache.size, [...cache.keys()]);
