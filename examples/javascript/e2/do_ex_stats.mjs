import { getHeapStatistics } from "node:v8";

const values = Array.from({ length: 500_000 }, (_, i) => (i * 7919) % 1000);

function statsChained(xs) {
  const sorted = [...xs].sort((a, b) => a - b);
  return {
    min: sorted[0],
    max: sorted.at(-1),
    mean: xs.reduce((a, b) => a + b, 0) / xs.length,
    over900: xs.filter((x) => x > 900).length,
  };
}

function statsOnePass(xs) {
  let min = Infinity, max = -Infinity, sum = 0, over900 = 0;
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    if (x < min) min = x;
    if (x > max) max = x;
    sum += x;
    if (x > 900) over900++;
  }
  return { min, max, mean: sum / xs.length, over900 };
}

function allocatedMB(work) {
  work();
  const before = getHeapStatistics().total_allocated_bytes;
  const result = work();
  const mb = (getHeapStatistics().total_allocated_bytes - before) / 2 ** 20;
  return { result, mb };
}

const a = allocatedMB(() => statsChained(values));
const b = allocatedMB(() => statsOnePass(values));
console.log(b.result);
const same = JSON.stringify(a.result) === JSON.stringify(b.result);
console.log("same result:", same);
console.log("one pass allocates under 1 MB:", b.mb < 1);
console.log("chained allocates over 2 MB:", a.mb > 2);
