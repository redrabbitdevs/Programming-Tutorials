import { createServer } from "node:http";
import { once } from "node:events";
import { setImmediate as yieldToLoop } from "node:timers/promises";
import { isPrime } from "./el_heartbeat.mjs";

async function countPrimes(limit, chunked) {
  let count = 0;
  for (let n = 0; n < limit; n++) {
    if (isPrime(n)) count++;
    if (chunked && n % 50_000 === 0) await yieldToLoop();
  }
  return count;
}

function startServer(chunked) {
  const server = createServer(async (req, res) => {
    if (req.url === "/health") return res.end("ok");
    res.end(String(await countPrimes(3_000_000, chunked)));
  });
  server.listen(0);
  return server;
}

// Ask for the primes, then 20 ms later for /health; which answers first?
async function firstToFinish(chunked) {
  const server = startServer(chunked);
  await once(server, "listening");
  const base = `http://localhost:${server.address().port}`;
  const finished = [];
  const get = (path) =>
    fetch(base + path).then((r) => r.text()).then(() => finished.push(path));
  const primes = get("/primes");
  await new Promise((resolve) => setTimeout(resolve, 20));
  await Promise.all([primes, get("/health")]);
  server.close();
  return finished[0];
}

console.log("blocking server, first answer:", await firstToFinish(false));
console.log("chunked server, first answer:", await firstToFinish(true));
