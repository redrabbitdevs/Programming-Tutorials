import { mock } from "node:test";

mock.timers.enable({ apis: ["setTimeout"] });
setTimeout(() => console.log("fired"), 1000);

console.log("before tick");
mock.timers.tick(999);
console.log("after 999 ms");
mock.timers.tick(1);
console.log("after 1000 ms");
mock.timers.reset();
