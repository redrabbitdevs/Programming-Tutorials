import { setTimeout as sleep } from "node:timers/promises";

const signal = AbortSignal.timeout(20);

try {
  await sleep(1000, null, { signal });
} catch (error) {
  console.log("sleep rejected with", error.name);
  console.log("signal reason is", signal.reason.name);
}
