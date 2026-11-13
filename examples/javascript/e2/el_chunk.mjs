import { setImmediate as yieldToLoop } from "node:timers/promises";
import { heartbeatsDuring, isPrime } from "./el_heartbeat.mjs";

async function countPrimesInChunks(limit, chunk = 50_000) {
  let count = 0;
  for (let start = 0; start < limit; start += chunk) {
    const end = Math.min(start + chunk, limit);
    for (let n = start; n < end; n++) if (isPrime(n)) count++;
    await yieldToLoop();
  }
  return count;
}

const { beats, result } = await heartbeatsDuring(
  () => countPrimesInChunks(3_000_000));
console.log("primes:", result);
console.log("heartbeats during the work:", beats > 5 ? "more than 5" : beats);
