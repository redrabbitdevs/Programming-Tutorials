import { EventEmitter } from "node:events";

const job = new EventEmitter();
job.on("error", (error) => console.log("handled:", error.message));
job.emit("error", new Error("disk full"));

const bare = new EventEmitter();
try {
  bare.emit("error", new Error("nobody listens"));
} catch (error) {
  console.log("thrown:", error.message);
}
