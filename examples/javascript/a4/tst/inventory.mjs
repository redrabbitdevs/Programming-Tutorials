import { createServer } from "node:http";

async function readJson(request) {
  let text = "";
  for await (const chunk of request) text += chunk;
  return JSON.parse(text);
}

function send(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

export function createInventory() {
  const items = new Map();
  return createServer(async (request, response) => {
    const match = /^\/items\/(\d+)$/.exec(request.url);
    if (request.method === "GET" && match) {
      const item = items.get(Number(match[1]));
      return send(response, item ? 200 : 404, item ?? { error: "not found" });
    }
    if (request.method === "POST" && request.url === "/items") {
      const body = await readJson(request).catch(() => null);
      if (typeof body?.name !== "string" || !Number.isInteger(body.qty)) {
        return send(response, 400, { error: "name and qty required" });
      }
      const item = { id: items.size + 1, name: body.name, qty: body.qty };
      items.set(item.id, item);
      return send(response, 201, item);
    }
    send(response, 404, { error: "not found" });
  });
}
