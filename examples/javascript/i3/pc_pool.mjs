const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

let running = 0;
let peak = 0;
const out = await mapLimit([400, 100, 200, 200, 300], 2, async (ms, i) => {
  running++;
  peak = Math.max(peak, running);
  console.log("start", i);
  await sleep(ms);
  console.log("done", i);
  running--;
  return ms / 100;
});
console.log(out, "peak:", peak);
