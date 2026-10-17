import { createServer } from "node:http";

const server = createServer((request, response) => {
  setTimeout(() => response.end("slow answer"), 150);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${server.address().port}/`;

try {
  await fetch(url, { signal: AbortSignal.timeout(30) });
} catch (error) {
  console.log("first request:", error.name);
}

const response = await fetch(url, { signal: AbortSignal.timeout(2000) });
console.log("second request:", await response.text());

server.close();
server.closeAllConnections();
