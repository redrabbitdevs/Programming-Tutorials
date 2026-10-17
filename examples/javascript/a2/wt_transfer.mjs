import { MessageChannel } from "node:worker_threads";

const { port1, port2 } = new MessageChannel();
const received = [];
port2.on("message", (bytes) => {
  received.push(bytes.byteLength);
  if (received.length === 2) {
    console.log("received:", received);
    port2.close();
  }
});

const bytes = new Uint8Array(1024 * 1024);
port1.postMessage(bytes);
console.log("after a copy:", bytes.byteLength);
port1.postMessage(bytes, [bytes.buffer]);
console.log("after a transfer:", bytes.byteLength);
