import { createClient } from "./pr_client.mjs";
import { startServer } from "./hf_helper.mjs";

const pages = { 1: ["a", "b"], 2: ["c", "d"], 3: ["e"] };

const { url, stop } = await startServer((req, res) => {
  const { searchParams } = new URL(req.url, "http://localhost");
  const page = Number(searchParams.get("page"));
  const next = pages[page + 1] ? page + 1 : null;
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ items: pages[page], next }));
});

async function* paginate(client, path) {
  let page = 1;
  while (page !== null) {
    const result = await client.get(`${path}?page=${page}`);
    yield* result.items;
    page = result.next;
  }
}

const client = createClient({ baseUrl: url });
console.log(await Array.fromAsync(paginate(client, "/items")));
await stop();
