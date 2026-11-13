import { AsyncLocalStorage } from "node:async_hooks";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { checkUrl } from "../shared/links.mjs";

const root = join(import.meta.dirname, "..");
const js = "text/javascript; charset=utf-8";
const files = {
  "/": ["public/index.html", "text/html; charset=utf-8"],
  "/client.js": ["public/client.js", js],
  "/links.mjs": ["shared/links.mjs", js],
};

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const requests = new AsyncLocalStorage();

function log(message) {
  const { id, write } = requests.getStore();
  write(`req ${id}: ${message}`);
}

async function readJson(request, limit = 10_000) {
  const chunks = [];
  let bytes = 0;
  for await (const chunk of request) {
    bytes += chunk.byteLength;
    if (bytes > limit) throw new HttpError(413, "body too large");
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "invalid JSON");
  }
}

async function api(store, method, path, request) {
  if (method === "POST" && path === "/api/links") {
    const body = await readJson(request);
    const url = body?.url;
    const problem = typeof url === "string" ? checkUrl(url) : "url required";
    if (problem) throw new HttpError(400, problem);
    const link = store.add(url);
    log(`created ${link.code}`);
    return [201, link];
  }
  const match = /^\/api\/links\/(\w+)$/.exec(path);
  const link = method === "GET" && match ? store.get(match[1]) : null;
  if (link) return [200, link];
  throw new HttpError(404, "not found");
}

async function serveFile(response, [path, type]) {
  response.writeHead(200, { "Content-Type": type });
  response.end(await readFile(join(root, path)));
}

async function route(store, request, response) {
  const path = new URL(request.url, "http://localhost").pathname;
  const { method } = request;
  if (method === "GET" && files[path]) {
    return serveFile(response, files[path]);
  }
  if (path.startsWith("/api/")) {
    const [status, body] = await api(store, method, path, request);
    return sendJson(response, status, body);
  }
  const target = method === "GET" ? store.visit(path.slice(1)) : null;
  if (target) return response.writeHead(302, { Location: target }).end();
  throw new HttpError(404, "not found");
}

async function handle(store, request, response) {
  try {
    await route(store, request, response);
  } catch (error) {
    const known = error instanceof HttpError;
    if (!known) log(error.stack);
    const { status, message } = known ? error
      : { status: 500, message: "internal error" };
    log(`${status} ${message}`);
    sendJson(response, status, { error: message });
  }
}

export function createApp(store, { write = console.log } = {}) {
  let nextId = 1;
  return createServer((request, response) => {
    const context = { id: nextId++, write };
    requests.run(context, () => handle(store, request, response));
  });
}
