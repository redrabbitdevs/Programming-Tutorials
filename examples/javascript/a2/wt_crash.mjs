import { Worker } from "node:worker_threads";

const worker = new Worker(new URL("./wt_crash_worker.mjs", import.meta.url));
worker.on("error", (error) => {
  console.log("error event:", error.name, error.message);
});
worker.on("exit", (code) => {
  console.log("exit code:", code);
});
