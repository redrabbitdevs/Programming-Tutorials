import { countPrimes } from "./primes.mjs";

self.addEventListener("message", (event) => {
  const { from, to } = event.data;
  self.postMessage(countPrimes(from, to));
});
