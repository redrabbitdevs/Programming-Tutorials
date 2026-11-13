import { performance } from "node:perf_hooks";
import { setTimeout as sleep } from "node:timers/promises";

function busyFor(ms) {
  const end = performance.now() + ms;
  while (performance.now() < end) JSON.parse('{"a": [1, 2, 3]}');
}

async function utilization(work) {
  const start = performance.eventLoopUtilization();
  await work();
  return performance.eventLoopUtilization(start).utilization;
}

const idle = await utilization(() => sleep(200));
const busy = await utilization(async () => {
  for (let i = 0; i < 4; i++) {
    busyFor(50);
    await sleep(1);
  }
});
console.log("idle loop under 20% busy:", idle < 0.2);
console.log("busy loop over 80% busy:", busy > 0.8);
