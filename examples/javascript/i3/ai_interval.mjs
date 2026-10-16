import { setInterval } from "node:timers/promises";

let count = 0;
for await (const label of setInterval(10, "tick")) {
  count++;
  console.log(label, count);
  if (count === 3) break;
}
console.log("stopped");
