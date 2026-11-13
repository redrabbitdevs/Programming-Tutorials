import { heartbeatsDuring, isPrime } from "./el_heartbeat.mjs";

function countPrimes(limit) {
  let count = 0;
  for (let n = 0; n < limit; n++) if (isPrime(n)) count++;
  return count;
}

const { beats, result } = await heartbeatsDuring(() => countPrimes(3_000_000));
console.log("primes:", result);
console.log("heartbeats during the work:", beats);
