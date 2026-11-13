import { EventEmitter } from "node:events";
import { writeHeapSnapshot } from "node:v8";

const bus = new EventEmitter();
bus.setMaxListeners(0);

class Session {
  constructor(id) {
    this.id = id;
    this.buffer = new Array(1000).fill(id);
    bus.on("shutdown", () => this.close());
  }
  close() {}
}

function handleRequest(id) {
  const session = new Session(id);
  return session.id;
}

for (let i = 0; i < 500; i++) handleRequest(i);
console.log("listeners:", bus.listenerCount("shutdown"));
console.log("wrote", writeHeapSnapshot("leak.heapsnapshot"));
