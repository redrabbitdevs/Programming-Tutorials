import { PerformanceObserver, constants } from "node:perf_hooks";
import { setTimeout as sleep } from "node:timers/promises";

const MINOR = constants.NODE_PERFORMANCE_GC_MINOR;

async function countMinorGCs(work) {
  let minor = 0;
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.detail.kind === MINOR) minor++;
    }
  });
  observer.observe({ entryTypes: ["gc"] });
  work();
  await sleep(50);
  observer.disconnect();
  return minor;
}

const recent = new Array(100);

function fresh() {
  for (let i = 0; i < 1_000_000; i++) {
    recent[i % 100] = { id: i, score: i * 2 };
  }
}

function reuse() {
  for (let i = 0; i < 1_000_000; i++) {
    const slot = (recent[i % 100] ??= { id: 0, score: 0 });
    slot.id = i;
    slot.score = i * 2;
  }
}

const a = await countMinorGCs(fresh);
recent.fill(undefined);
const b = await countMinorGCs(reuse);
console.log("fresh objects, minor GCs:", a > 10 ? "more than 10" : a);
console.log("reused objects, minor GCs:", b < 3 ? "fewer than 3" : b);
