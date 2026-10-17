import { EventEmitter } from "node:events";

const bus = new EventEmitter();
bus.on("greet", (name) => console.log("hello,", name));
bus.once("greet", () => console.log("first greeting only"));

console.log(bus.emit("greet", "Ada"));
console.log(bus.emit("greet", "Alan"));
console.log(bus.emit("nobody-listens"));
