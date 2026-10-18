import { parentPort, workerData } from "node:worker_threads";
import { countPrimes } from "./primes.mjs";

const { from, to } = workerData;
parentPort.postMessage({ from, to, count: countPrimes(from, to) });
