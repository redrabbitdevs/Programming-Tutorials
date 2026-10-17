import { isMainThread, Worker, workerData } from "node:worker_threads";

const DONE = 0;

if (!isMainThread) {
  const { shared, id } = workerData;
  const view = new Int32Array(shared);
  Atomics.store(view, id, id * 10);
  Atomics.add(view, DONE, 1);
  Atomics.notify(view, DONE);
} else {
  const shared = new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT);
  const view = new Int32Array(shared);
  const url = new URL(import.meta.url);
  for (const id of [1, 2, 3]) new Worker(url, { workerData: { shared, id } });

  let done;
  while ((done = Atomics.load(view, DONE)) < 3) {
    const result = Atomics.waitAsync(view, DONE, done);
    if (result.async) await result.value;
  }
  console.log("all done:", [...view.slice(1)]);
}
