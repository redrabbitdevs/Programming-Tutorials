import { workerData } from "node:worker_threads";

const { shared, atomic, times } = workerData;
const counter = new Int32Array(shared);

Atomics.wait(counter, 1, 0);
for (let i = 0; i < times; i++) {
  if (atomic) Atomics.add(counter, 0, 1);
  else counter[0]++;
}
