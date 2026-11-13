import { setImmediate as nextTurn } from "node:timers/promises";
import { heartbeatsDuring, isPrime } from "./el_heartbeat.mjs";

async function countPrimes(limit, pause) {
  let count = 0;
  for (let n = 0; n < limit; n++) {
    if (isPrime(n)) count++;
    if (n % 50_000 === 0) await pause();
  }
  return count;
}

const viaPromise = () => countPrimes(3_000_000, () => Promise.resolve());
const viaImmediate = () => countPrimes(3_000_000, () => nextTurn());

const a = await heartbeatsDuring(viaPromise);
const b = await heartbeatsDuring(viaImmediate);
console.log("await Promise.resolve():", a.beats, "heartbeats");
console.log("await setImmediate():", b.beats > 5 ? "more than 5" : b.beats,
  "heartbeats");
