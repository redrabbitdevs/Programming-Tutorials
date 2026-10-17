import { isMainThread, parentPort, Worker, workerData }
  from "node:worker_threads";
import { once } from "node:events";

function countWords(lines) {
  const counts = new Map();
  for (const line of lines) {
    for (const word of line.toLowerCase().match(/[a-z']+/g) ?? []) {
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }
  return counts;
}

async function countInWorker(lines) {
  const worker = new Worker(new URL(import.meta.url), { workerData: lines });
  const [counts] = await once(worker, "message");
  return counts;
}

if (!isMainThread) {
  parentPort.postMessage(countWords(workerData));
} else {
  const text = ["The cat sat on the mat.", "The dog sat on the log.",
    "A cat and a dog.", "The end."];
  const parts = [text.slice(0, 2), text.slice(2)];
  const results = await Promise.all(parts.map(countInWorker));
  const total = new Map();
  for (const counts of results) {
    for (const [word, n] of counts) total.set(word, (total.get(word) ?? 0) + n);
  }
  const byCount = (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]);
  console.log([...total].sort(byCount).slice(0, 3));
}
