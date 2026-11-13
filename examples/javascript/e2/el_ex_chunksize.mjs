import { setImmediate as yieldToLoop } from "node:timers/promises";

async function sumInChunks(values, chunk) {
  let total = 0;
  let yields = 0;
  for (let start = 0; start < values.length; start += chunk) {
    const end = Math.min(start + chunk, values.length);
    for (let i = start; i < end; i++) total += values[i];
    await yieldToLoop();
    yields++;
  }
  return { total, yields };
}

const values = Array.from({ length: 200_000 }, (_, i) => i % 10);
const ms = {};
for (const chunk of [1, 1000, 200_000]) {
  const start = performance.now();
  const { total, yields } = await sumInChunks(values, chunk);
  ms[chunk] = performance.now() - start;
  console.log(`chunk ${chunk}: total ${total}, ${yields} yields`);
}
console.log("chunk 1 over 10x slower than 1000:", ms[1] > 10 * ms[1000]);
