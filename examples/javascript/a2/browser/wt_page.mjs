const url = new URL("./wt_page_worker.mjs", import.meta.url);
const worker = new Worker(url, { type: "module" });

worker.addEventListener("message", (event) => {
  document.querySelector("#result").textContent = `${event.data} primes`;
});
worker.postMessage({ from: 0, to: 2_000_000 });
