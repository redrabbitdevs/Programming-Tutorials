import { createServer } from "node:http";

const allowed = new Set(["https://shop.example"]);

const server = createServer((request, response) => {
  const origin = request.headers.origin;
  if (allowed.has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Vary", "Origin");
  }
  if (request.method === "OPTIONS") {
    response.setHeader("Access-Control-Allow-Methods", "GET, POST");
    response.setHeader(
      "Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.writeHead(204).end();
    return;
  }
  response.end("ok");
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${server.address().port}/`;

const requests = [
  ["GET", "https://shop.example"],
  ["GET", "https://evil.example"],
  ["OPTIONS", "https://shop.example"],
];
for (const [method, origin] of requests) {
  const response = await fetch(url, { method, headers: { Origin: origin } });
  const credentials = response.headers.get("access-control-allow-credentials");
  const allowHeaders = response.headers.get("access-control-allow-headers");
  console.log(method, response.status, credentials, allowHeaders);
}
server.close();
