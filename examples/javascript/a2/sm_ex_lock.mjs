import { isMainThread, Worker, workerData } from "node:worker_threads";
import { once } from "node:events";

const LOCK = 0;
const COUNT = 1;

function lock(view) {
  while (Atomics.compareExchange(view, LOCK, 0, 1) !== 0) {
    Atomics.wait(view, LOCK, 1);
  }
}

function unlock(view) {
  Atomics.store(view, LOCK, 0);
  Atomics.notify(view, LOCK, 1);
}

if (!isMainThread) {
  const view = new Int32Array(workerData);
  for (let i = 0; i < 100_000; i++) {
    lock(view);
    view[COUNT]++;
    unlock(view);
  }
} else {
  const shared = new SharedArrayBuffer(8);
  const url = new URL(import.meta.url);
  const exits = Array.from({ length: 4 }, () =>
    once(new Worker(url, { workerData: shared }), "exit"));
  await Promise.all(exits);
  console.log("with a lock:", new Int32Array(shared)[COUNT]);
}
