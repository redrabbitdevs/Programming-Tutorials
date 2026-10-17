import { countPrimes } from "./primes.mjs";

setTimeout(() => console.log("timer fired"), 0);
console.log("primes below 2,000,000:", countPrimes(0, 2_000_000));
console.log("counting finished");
