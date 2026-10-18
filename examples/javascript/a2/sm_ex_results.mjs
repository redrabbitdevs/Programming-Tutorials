import { Worker } from "node:worker_threads";

const view = new Int32Array(new SharedArrayBuffer(4));

console.log("value differs:", Atomics.wait(view, 0, 7));
console.log("nobody wakes us:", Atomics.wait(view, 0, 0, 10));

const pending = Atomics.waitAsync(view, 0, 0);
console.log("waitAsync gave a promise:", pending.async);

const notifier = `
  const { workerData } = require("node:worker_threads");
  const view = new Int32Array(workerData);
  Atomics.store(view, 0, 1);
  Atomics.notify(view, 0);
`;
new Worker(notifier, { eval: true, workerData: view.buffer });
console.log("worker notified us:", await pending.value);
