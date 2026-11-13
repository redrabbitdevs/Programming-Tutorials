import { monitorEventLoopDelay } from "node:perf_hooks";
import { setTimeout as sleep } from "node:timers/promises";

function blockFor(ms) {
  const end = performance.now() + ms;
  while (performance.now() < end);
}

const delay = monitorEventLoopDelay({ resolution: 10 });
delay.enable();
await sleep(300);
const quiet = delay.max / 1e6;

delay.reset();
for (let i = 0; i < 3; i++) {
  blockFor(150);
  await sleep(50);
}
delay.disable();

console.log("quiet: max delay under 50 ms:", quiet < 50);
console.log("busy: max delay over 100 ms:", delay.max / 1e6 > 100);
