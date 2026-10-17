import { setTimeout as sleep } from "node:timers/promises";

let pagesDone = 0;

async function crawl(signal) {
  for (let page = 1; page <= 5; page++) {
    await sleep(200, null, { signal });
    pagesDone = page;
  }
}

const signal = AbortSignal.timeout(500);
try {
  await crawl(signal);
} catch (error) {
  console.log(`${error.name} after ${pagesDone} pages`);
  console.log("signal reason:", signal.reason.name);
}
