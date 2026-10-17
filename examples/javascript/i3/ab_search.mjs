import { setTimeout as sleep } from "node:timers/promises";

async function searchPages(query, { signal } = {}) {
  for (let page = 1; page <= 5; page++) {
    signal?.throwIfAborted();
    await sleep(200, null, { signal });
    console.log(query, "finished page", page);
  }
}

const controller = new AbortController();
setTimeout(() => controller.abort(), 500);

try {
  await searchPages("cats", { signal: controller.signal });
} catch (error) {
  console.log("search stopped:", error.name);
}
