import { createServer } from "node:http";
import { createClient } from "./src/client.mjs";

const pages = { 1: ["a", "b"], 2: ["c", "d"], 3: ["e"] };

const server = createServer((req, res) => {
  const { searchParams } = new URL(req.url, "http://localhost");
  const page = Number(searchParams.get("page"));
  const next = pages[page + 1] ? page + 1 : null;
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ items: pages[page], next }));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

async function* paginate(client, path) {
  let page = 1;
  while (page !== null) {
    const result = await client.get(`${path}?page=${page}`);
    yield* result.items;
    page = result.next;
  }
}

const baseUrl = `http://127.0.0.1:${server.address().port}`;
const client = createClient({ baseUrl });
console.log(await Array.fromAsync(paginate(client, "/items")));
server.close();
server.closeAllConnections();
