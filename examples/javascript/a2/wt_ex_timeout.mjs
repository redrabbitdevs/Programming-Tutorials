import { Worker } from "node:worker_threads";

function runWithTimeout(code, ms) {
  const worker = new Worker(code, { eval: true });
  const { promise, resolve, reject } = Promise.withResolvers();
  const timer = setTimeout(async () => {
    const exitCode = await worker.terminate();
    reject(new Error(`timed out after ${ms} ms, exit code ${exitCode}`));
  }, ms);
  worker.once("message", (value) => {
    clearTimeout(timer);
    resolve(value);
  });
  worker.once("error", (error) => {
    clearTimeout(timer);
    reject(error);
  });
  return promise;
}

const quick = `
  const { parentPort } = require("node:worker_threads");
  parentPort.postMessage(6 * 7);
`;
console.log("quick:", await runWithTimeout(quick, 5000));

try {
  await runWithTimeout("for (;;) {}", 100);
} catch (error) {
  console.log("endless:", error.message);
}
