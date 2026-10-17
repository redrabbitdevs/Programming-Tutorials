import { setTimeout as sleep } from "node:timers/promises";

async function searchPages(query, { signal } = {}) {
  const found = [];
  for (let page = 1; page <= 5; page++) {
    signal?.throwIfAborted();
    await sleep(40, null, { signal });
    found.push(`${query} page ${page}`);
    console.log("finished page", page);
  }
  return found;
}

const controller = new AbortController();
setTimeout(() => controller.abort(), 100);

try {
  await searchPages("cats", { signal: controller.signal });
} catch (error) {
  console.log("search stopped:", error.name);
}
