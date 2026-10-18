import { Worker } from "node:worker_threads";
import { once } from "node:events";

const url = new URL("./wt_count_worker.mjs", import.meta.url);
const worker = new Worker(url, { workerData: { from: 0, to: 2_000_000 } });
const exited = once(worker, "exit");

const [result] = await once(worker, "message");
console.log("worker says:", result);
const [code] = await exited;
console.log("exit code:", code);
