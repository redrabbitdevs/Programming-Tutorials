// @ts-nocheck (a test helper: the checker looks at src/ and the demos only)
import { createServer } from "node:http";
import { setTimeout as sleep } from "node:timers/promises";

async function readJson(req) {
  req.setEncoding("utf8");
  let text = "";
  for await (const chunk of req) text += chunk;
  return JSON.parse(text);
}

export async function startApi() {
  const users = [{ id: 1, name: "Ada" }, { id: 2, name: "Alan" }];
  const stats = { requests: 0 };
  const behavior = { failures: 0, delayMs: 0 };

  const server = createServer(async (req, res) => {
    stats.requests++;
    const send = (status, data) => {
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify(data));
    };
    if (behavior.delayMs > 0) await sleep(behavior.delayMs);
    if (behavior.failures > 0) {
      behavior.failures--;
      return send(503, { error: "busy" });
    }

    const { pathname } = new URL(req.url, "http://localhost");
    const one = pathname.match(/^\/users\/(\d+)$/);
    if (req.method === "GET" && pathname === "/users") return send(200, users);
    if (req.method === "GET" && one) {
      const user = users.find((u) => u.id === Number(one[1]));
      return user ? send(200, user) : send(404, { error: "not found" });
    }
    if (req.method === "POST" && pathname === "/users") {
      const user = { id: users.length + 1, ...(await readJson(req)) };
      users.push(user);
      return send(201, user);
    }
    send(404, { error: "not found" });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const stop = () =>
    new Promise((resolve) => {
      server.close(resolve);
      server.closeAllConnections();
    });
  return { url, stop, stats, behavior };
}
