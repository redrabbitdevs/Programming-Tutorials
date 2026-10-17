import { parentPort } from "node:worker_threads";
import { countPrimes } from "./primes.mjs";

parentPort.on("message", ({ from, to }) => {
  parentPort.postMessage(countPrimes(from, to));
});
