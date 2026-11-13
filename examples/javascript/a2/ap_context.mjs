import { AsyncLocalStorage } from "node:async_hooks";
import { EventEmitter } from "node:events";
import { setTimeout as sleep } from "node:timers/promises";

const context = new AsyncLocalStorage();
const settle = () => new Promise((resolve) => setImmediate(resolve));

function log(message) {
  const id = context.getStore()?.id ?? "-";
  console.log(`[${id}] ${message}`);
}

async function handle(turns) {
  log("start");
  for (let i = 0; i < turns; i++) await settle();
  log(`done after ${turns} turns`);
}

await Promise.all([
  context.run({ id: "A" }, () => handle(2)),
  context.run({ id: "B" }, () => handle(1)),
]);
context.run({ id: "C" }, () => setTimeout(() => log("timer"), 5));
await sleep(10);
log("outside any request");

const events = new EventEmitter();
context.run({ id: "on" }, () => {
  events.on("plain", () => log("plain listener"));
  events.on("bound", AsyncLocalStorage.bind(() => log("bound listener")));
});
context.run({ id: "emit" }, () => {
  events.emit("plain");
  events.emit("bound");
});
