import { createServer } from "node:http";

const allowed = new Set(["https://shop.example"]);

const server = createServer((request, response) => {
  const origin = request.headers.origin;
  if (allowed.has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
  }
  if (request.method === "OPTIONS") {
    response.setHeader("Access-Control-Allow-Methods", "GET, POST");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.writeHead(204).end();
    return;
  }
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ stock: 3 }));
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${server.address().port}/stock`;

async function ask(origin, method = "GET", headers = {}) {
  const response = await fetch(url, {
    method,
    headers: { Origin: origin, ...headers },
  });
  const allow = response.headers.get("access-control-allow-origin");
  console.log(method, origin, response.status, allow);
}

await ask("https://shop.example");
await ask("https://evil.example");
await ask("https://shop.example", "OPTIONS", {
  "Access-Control-Request-Method": "POST",
});
server.close();
