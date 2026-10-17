import { startServer } from "./hf_helper.mjs";

const users = new Map([
  ["1", { id: 1, name: "Ada" }],
  ["2", { id: 2, name: "Alan" }],
]);

function send(res, status, data) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
}

const { url, stop } = await startServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  const match = pathname.match(/^\/users\/(\d+)$/);
  if (req.method === "GET" && match && users.has(match[1])) {
    return send(res, 200, users.get(match[1]));
  }
  send(res, 404, { error: "not found" });
});

const found = await fetch(`${url}/users/1`);
console.log(found.status, await found.json());

const missing = await fetch(`${url}/users/99`);
console.log(missing.status, missing.ok, await missing.json());
await stop();
