import { isMainThread, parentPort, Worker } from "node:worker_threads";
import { once } from "node:events";

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url));
  const exited = once(worker, "exit");
  const bytes = Uint8Array.from([0, 1, 254, 255]);
  worker.postMessage(bytes, [bytes.buffer]);
  console.log("sent, length here is now", bytes.length);
  const [inverted] = await once(worker, "message");
  console.log("got back", inverted);
  const [code] = await exited;
  console.log("worker exit code:", code);
} else {
  parentPort.once("message", (bytes) => {
    for (let i = 0; i < bytes.length; i++) bytes[i] = 255 - bytes[i];
    parentPort.postMessage(bytes, [bytes.buffer]);
  });
}
