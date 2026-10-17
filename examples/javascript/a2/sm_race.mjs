import { Worker } from "node:worker_threads";
import { once } from "node:events";

const url = new URL("./sm_counter_worker.mjs", import.meta.url);
const WORKERS = 4;
const TIMES = 1_000_000;

async function count(atomic) {
  const shared = new SharedArrayBuffer(8);
  const counter = new Int32Array(shared);
  const workerData = { shared, atomic, times: TIMES };
  const exits = Array.from({ length: WORKERS }, () =>
    once(new Worker(url, { workerData }), "exit"));
  Atomics.store(counter, 1, 1);
  Atomics.notify(counter, 1);
  await Promise.all(exits);
  return counter[0];
}

const plain = await count(false);
const atomic = await count(true);
console.log("expected:", WORKERS * TIMES);
console.log("Atomics.add:", atomic);
console.log("plain ++ never more:", plain <= WORKERS * TIMES);
