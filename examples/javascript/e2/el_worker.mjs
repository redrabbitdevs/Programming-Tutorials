import { isMainThread, parentPort, workerData, Worker }
  from "node:worker_threads";
import { once } from "node:events";
import { heartbeatsDuring, isPrime } from "./el_heartbeat.mjs";

function workerMain() {
  let count = 0;
  for (let n = 0; n < workerData; n++) if (isPrime(n)) count++;
  parentPort.postMessage(count);
}

async function countInWorker(limit) {
  const worker = new Worker(new URL(import.meta.url), { workerData: limit });
  const [count] = await once(worker, "message");
  return count;
}

if (isMainThread) {
  const { beats, result } = await heartbeatsDuring(
    () => countInWorker(3_000_000));
  console.log("primes:", result);
  console.log("heartbeats during the work:", beats > 5 ? "more than 5" : beats);
} else {
  workerMain();
}
