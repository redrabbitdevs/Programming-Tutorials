import { workerData } from "node:worker_threads";

const numbers = new Int32Array(workerData);
for (let i = 0; i < numbers.length; i++) numbers[i] *= 2;
