import { EventEmitter } from "node:events";
import { writeHeapSnapshot } from "node:v8";

const bus = new EventEmitter();

class Session {
  #onShutdown = () => this.close();
  constructor(id) {
    this.id = id;
    this.buffer = new Array(1000).fill(id);
    bus.on("shutdown", this.#onShutdown);
  }
  close() {
    bus.off("shutdown", this.#onShutdown);
  }
}

function handleRequest(id) {
  const session = new Session(id);
  try {
    return session.id;
  } finally {
    session.close();
  }
}

for (let i = 0; i < 500; i++) handleRequest(i);
console.log("listeners:", bus.listenerCount("shutdown"));
console.log("wrote", writeHeapSnapshot("fixed.heapsnapshot"));
