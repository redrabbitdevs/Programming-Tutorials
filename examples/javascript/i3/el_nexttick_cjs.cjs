const { nextTick } = require("node:process");

Promise.resolve().then(() => console.log("promise callback"));
queueMicrotask(() => console.log("queueMicrotask"));
nextTick(() => console.log("nextTick"));
console.log("sync");
