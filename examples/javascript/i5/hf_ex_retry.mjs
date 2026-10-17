import { startServer } from "./hf_helper.mjs";

async function fetchRetry(url, attempts) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const response = await fetch(url);
    if (response.ok) return response.text();
    if (response.status < 500) {
      throw new Error(`client error ${response.status}`);
    }
  }
  throw new Error("giving up");
}

function flaky(failures) {
  let requests = 0;
  return startServer((req, res) => {
    requests++;
    res.writeHead(requests <= failures ? 503 : 200);
    res.end("ready");
  }).then((server) => ({ ...server, count: () => requests }));
}

const first = await flaky(2);
console.log(await fetchRetry(first.url, 5), "after", first.count(), "requests");
await first.stop();

const second = await flaky(2);
await fetchRetry(second.url, 2).catch((e) => console.log(e.message));
await second.stop();

const gone = await startServer((req, res) => {
  res.writeHead(404);
  res.end();
});
await fetchRetry(gone.url, 3).catch((e) => console.log(e.message));
await gone.stop();
