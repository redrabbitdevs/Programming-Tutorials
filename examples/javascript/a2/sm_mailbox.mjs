import { Worker } from "node:worker_threads";
import { once } from "node:events";

const STATE = 0;
const VALUE = 1;
const EMPTY = 0;

async function waitWhile(view, index, value) {
  while (Atomics.load(view, index) === value) {
    const result = Atomics.waitAsync(view, index, value);
    if (result.async) await result.value;
  }
}

const shared = new SharedArrayBuffer(8);
const box = new Int32Array(shared);
const url = new URL("./sm_mailbox_worker.mjs", import.meta.url);
const worker = new Worker(url, { workerData: shared });
const exited = once(worker, "exit");

const received = [];
for (let i = 0; i < 5; i++) {
  await waitWhile(box, STATE, EMPTY);
  received.push(box[VALUE]);
  Atomics.store(box, STATE, EMPTY);
  Atomics.notify(box, STATE);
}
await exited;
console.log("received:", received.join(" "));
