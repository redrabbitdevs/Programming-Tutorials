import { EventEmitter, once } from "node:events";

const loader = new EventEmitter();
setTimeout(() => loader.emit("loaded", "config.json", 3), 20);
const [file, count] = await once(loader, "loaded");
console.log("loaded", file, count);

setTimeout(() => loader.emit("error", new Error("bad file")), 20);
await once(loader, "loaded").catch((error) => console.log(error.message));
