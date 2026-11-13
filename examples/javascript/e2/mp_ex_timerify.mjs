import { performance, PerformanceObserver } from "node:perf_hooks";

function parseConfig(text) {
  return JSON.parse(text);
}

const entries = [];
const observer = new PerformanceObserver((list) => {
  entries.push(...list.getEntries());
});
observer.observe({ entryTypes: ["function"] });

const timed = performance.timerify(parseConfig);
for (let i = 0; i < 5; i++) timed(`{"port": ${8000 + i}}`);

await new Promise((resolve) => setImmediate(resolve));
observer.disconnect();
console.log("entries:", entries.length);
console.log("name:", entries[0].name, "type:", entries[0].entryType);
console.log("all durations >= 0:", entries.every((e) => e.duration >= 0));
