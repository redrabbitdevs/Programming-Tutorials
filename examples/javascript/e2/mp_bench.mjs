import { createHistogram } from "node:perf_hooks";

export let sink;

export function bench(fn, { batch = 1000, samples = 50, warmup = 10 } = {}) {
  const histogram = createHistogram();
  for (let s = -warmup; s < samples; s++) {
    const start = process.hrtime.bigint();
    for (let i = 0; i < batch; i++) sink = fn(i);
    const perCall = (process.hrtime.bigint() - start) / BigInt(batch);
    if (s >= 0) histogram.record(perCall > 0n ? perCall : 1n);
  }
  return {
    median: histogram.percentile(50),
    p95: histogram.percentile(95),
    min: histogram.min,
  };
}
