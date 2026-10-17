import { mock } from "node:test";

mock.timers.enable({ apis: ["setInterval"] });
let count = 0;
const id = setInterval(() => (count += 1), 10);

mock.timers.tick(35);
console.log("after 35 ms:", count);
mock.timers.tick(5);
console.log("after 40 ms:", count);

clearInterval(id);
mock.timers.reset();
