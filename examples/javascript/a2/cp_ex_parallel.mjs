import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { Semaphore } from "./semaphore.mjs";

const run = promisify(execFile);
const semaphore = new Semaphore(2);
let running = 0;
let peak = 0;

async function square(n) {
  await semaphore.acquire();
  running++;
  peak = Math.max(peak, running);
  try {
    const { stdout } = await run(process.execPath, ["-p", `${n} * ${n}`]);
    return Number(stdout);
  } finally {
    running--;
    semaphore.release();
  }
}

const results = await Promise.all([1, 2, 3, 4, 5].map(square));
console.log(results.join(" "), "- peak:", peak);
