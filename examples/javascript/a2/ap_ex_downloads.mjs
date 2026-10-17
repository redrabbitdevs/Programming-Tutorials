import { Semaphore } from "./semaphore.mjs";

const settle = () => new Promise((resolve) => setImmediate(resolve));
const failsOnce = new Set(["/b", "/e"]);
const tries = new Map();
let active = 0;
let peak = 0;

async function download(url) {
  active++;
  peak = Math.max(peak, active);
  try {
    await settle();
    tries.set(url, (tries.get(url) ?? 0) + 1);
    if (failsOnce.has(url) && tries.get(url) === 1) {
      throw new Error(`${url} timed out`);
    }
    return `${url}=${url.charCodeAt(1) - 96}KB`;
  } finally {
    active--;
  }
}

async function withRetry(fn, attempts) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= attempts) throw error;
    }
  }
}

const semaphore = new Semaphore(3);
async function fetchOne(url) {
  await semaphore.acquire();
  try {
    return await withRetry(() => download(url), 3);
  } finally {
    semaphore.release();
  }
}

const urls = ["/a", "/b", "/c", "/d", "/e", "/f", "/g"];
const results = await Promise.all(urls.map(fetchOne));
console.log(results.join(" "));
const total = [...tries.values()].reduce((a, b) => a + b, 0);
console.log("peak:", peak, "attempts:", total);
