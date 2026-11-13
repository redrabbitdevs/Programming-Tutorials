import { createHistogram } from "node:perf_hooks";

// 100 response times in milliseconds: most are quick, a few are not.
const times = [
  ...Array(90).fill(12), ...Array(7).fill(15), 80, 250, 900,
];

const histogram = createHistogram();
for (const t of times) histogram.record(t);

const mean = times.reduce((a, b) => a + b, 0) / times.length;
console.log("mean:  ", mean.toFixed(1));
console.log("min:   ", histogram.min);
console.log("median:", histogram.percentile(50));
console.log("p99:   ", histogram.percentile(99));
console.log("max:   ", histogram.max);
