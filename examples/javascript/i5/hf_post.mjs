import { startServer } from "./hf_helper.mjs";

async function readBody(req) {
  req.setEncoding("utf8");
  let text = "";
  for await (const chunk of req) text += chunk;
  return text;
}

const todos = [];
const { url, stop } = await startServer(async (req, res) => {
  const reply = (status, data) => {
    res.writeHead(status, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
  };
  try {
    const body = JSON.parse(await readBody(req));
    if (typeof body.title !== "string") {
      return reply(400, { error: "title required" });
    }
    todos.push({ id: todos.length + 1, title: body.title });
    reply(201, todos.at(-1));
  } catch {
    reply(400, { error: "invalid JSON" });
  }
});

async function post(body) {
  const response = await fetch(`${url}/todos`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
  console.log(response.status, await response.json());
}

await post(JSON.stringify({ title: "write lesson" }));
await post(JSON.stringify({ name: "no title" }));
await post("{ not json");
await stop();
