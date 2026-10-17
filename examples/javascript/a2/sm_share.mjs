import { Worker } from "node:worker_threads";
import { once } from "node:events";

const url = new URL("./sm_double_worker.mjs", import.meta.url);

async function doubleInWorker(buffer) {
  const numbers = new Int32Array(buffer);
  numbers.set([1, 2, 3, 4]);
  const worker = new Worker(url, { workerData: buffer });
  await once(worker, "exit");
  return numbers;
}

const copied = await doubleInWorker(new ArrayBuffer(16));
const shared = await doubleInWorker(new SharedArrayBuffer(16));
console.log("ArrayBuffer:      ", copied);
console.log("SharedArrayBuffer:", shared);
