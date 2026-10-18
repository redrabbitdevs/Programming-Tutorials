import { availableParallelism } from "node:os";
import { WorkerPool } from "./worker_pool.mjs";

const size = Math.min(4, availableParallelism());
const url = new URL("./wt_pool_worker.mjs", import.meta.url);
const pool = new WorkerPool(url, size);

const limit = 2_000_000;
const step = limit / 8;
const ranges = Array.from({ length: 8 }, (_, i) => ({
  from: i * step,
  to: (i + 1) * step,
}));
const counts = await Promise.all(ranges.map((range) => pool.run(range)));
await pool.close();

console.log("per chunk:", counts.join(" "));
console.log("total:", counts.reduce((a, b) => a + b, 0));
