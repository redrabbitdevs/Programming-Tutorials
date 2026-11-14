import { getHeapStatistics } from "node:v8";

// Bytes allocated on the JavaScript heap so far. Node 26 and later only.
function allocatedBytes() {
  const bytes = getHeapStatistics().total_allocated_bytes;
  if (bytes === undefined) throw new Error("needs Node 26 or later");
  return bytes;
}

// Megabytes allocated while `work` runs, after three warm-up runs.
function allocatedMB(work) {
  for (let i = 0; i < 3; i++) work();
  const before = allocatedBytes();
  const result = work();
  return { result, mb: (allocatedBytes() - before) / 2 ** 20 };
}

const cents = Array.from({ length: 1_000_000 }, (_, i) => i % 500);

const chain = () => cents.map((c) => c * 2).filter((c) => c > 100)
  .reduce((a, b) => a + b, 0);

const helpers = () => cents.values().map((c) => c * 2)
  .filter((c) => c > 100).reduce((a, b) => a + b, 0);

function loop() {
  let total = 0;
  for (let i = 0; i < cents.length; i++) {
    const doubled = cents[i] * 2;
    if (doubled > 100) total += doubled;
  }
  return total;
}

const runs = { chain, helpers, loop };
const mb = {};
for (const [name, fn] of Object.entries(runs)) {
  const run = allocatedMB(fn);
  mb[name] = run.mb;
  console.log(`${name}: ${run.result}`);
}
console.log("chain allocates over 10x the loop:", mb.chain > 10 * mb.loop);
console.log("helpers allocate more than chain:", mb.helpers > mb.chain);
