function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(timer);
      reject(signal.reason);
    }
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

const controller = new AbortController();
setTimeout(() => controller.abort(new Error("changed my mind")), 10);
await sleep(5, controller.signal);
console.log("short sleep finished");
await sleep(1000, controller.signal).catch((e) => console.log(e.message));
await sleep(5, controller.signal).catch((e) => console.log(e.message));
