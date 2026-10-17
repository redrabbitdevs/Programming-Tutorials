import { workerData } from "node:worker_threads";

const STATE = 0;
const VALUE = 1;
const FULL = 1;
const box = new Int32Array(workerData);

for (let n = 1; n <= 5; n++) {
  while (Atomics.load(box, STATE) === FULL) {
    Atomics.wait(box, STATE, FULL);
  }
  box[VALUE] = n * n;
  Atomics.store(box, STATE, FULL);
  Atomics.notify(box, STATE);
}
