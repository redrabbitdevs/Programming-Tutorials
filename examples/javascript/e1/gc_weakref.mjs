import { setTimeout as sleep } from "node:timers/promises";

let big = { data: new Array(100_000).fill(1) };
const ref = new WeakRef(big);
const registry = new FinalizationRegistry((label) => {
  console.log("finalized:", label);
});
registry.register(big, "big object");

console.log("alive before:", ref.deref() !== undefined);
big = null;

await sleep(0);
globalThis.gc();
console.log("alive after gc:", ref.deref() !== undefined);
await sleep(10);
