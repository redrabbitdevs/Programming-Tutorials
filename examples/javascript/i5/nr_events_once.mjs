import { EventEmitter, once } from "node:events";
import { Readable } from "node:stream";

const task = new EventEmitter();
setTimeout(() => task.emit("done", 42, "ok"), 10);
const [value, label] = await once(task, "done");
console.log(value, label);

setTimeout(() => task.emit("error", new Error("task failed")), 10);
await once(task, "done").catch((error) => console.log(error.message));

const stream = Readable.from(["a", "b"]);
console.log(stream instanceof EventEmitter, process instanceof EventEmitter);
stream.on("data", (chunk) => console.log("data:", chunk));
stream.on("end", () => console.log("end"));
