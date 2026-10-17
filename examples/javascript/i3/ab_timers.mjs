import { setTimeout as sleep } from "node:timers/promises";

const controller = new AbortController();
const waiting = sleep(1000, "finished", { signal: controller.signal });
controller.abort();

try {
  await waiting;
} catch (error) {
  console.log("sleep rejected with", error.name);
}
console.log(await sleep(5, "finished normally"));
