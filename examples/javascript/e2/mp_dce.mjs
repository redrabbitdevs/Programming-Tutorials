function unused(n) {
  for (let i = 0; i < n; i++) Math.sqrt(i) * 2.5;
}

function used(n) {
  let total = 0;
  for (let i = 0; i < n; i++) total += Math.sqrt(i) * 2.5;
  return total;
}

function time(fn) {
  const start = performance.now();
  fn(50_000_000);
  return performance.now() - start;
}

time(unused);
time(used);
const ratio = time(used) / time(unused);
console.log("result unused, at least 2x faster:", ratio > 2);
