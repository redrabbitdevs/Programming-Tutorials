import { setTimeout as sleep } from "node:timers/promises";

let current;

async function search(query) {
  current?.abort();
  current = new AbortController();
  try {
    await sleep(30, null, { signal: current.signal });
    console.log("results for", query);
  } catch (error) {
    if (error.name !== "AbortError") throw error;
    console.log("cancelled", query);
  }
}

search("a");
search("ab");
await search("abc");
