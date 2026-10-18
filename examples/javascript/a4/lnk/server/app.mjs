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

async function readJson(request, limit = 10_000) {
  let text = "";
  for await (const chunk of request) {
    text += chunk;
    if (text.length > limit) throw new RangeError("body too large");
  }
  return JSON.parse(text);
}

async function serveFile(response, [path, type]) {
  response.writeHead(200, { "Content-Type": type });
  response.end(await readFile(join(root, path)));
}

async function api(store, method, path, request, response) {
  if (method === "POST" && path === "/api/links") {
    const body = await readJson(request).catch(() => null);
    const url = body?.url;
    const problem = typeof url === "string" ? checkUrl(url) : "url required";
    if (problem) return sendJson(response, 400, { error: problem });
    return sendJson(response, 201, store.add(url));
  }
  const match = /^\/api\/links\/(\w+)$/.exec(path);
  const link = method === "GET" && match ? store.get(match[1]) : null;
  if (link) return sendJson(response, 200, link);
  sendJson(response, 404, { error: "not found" });
}

async function route(store, request, response) {
  const path = new URL(request.url, "http://localhost").pathname;
  const { method } = request;
  if (method === "GET" && files[path]) {
    return serveFile(response, files[path]);
  }
  if (path.startsWith("/api/")) {
    return api(store, method, path, request, response);
  }
  const target = method === "GET" ? store.visit(path.slice(1)) : null;
  if (target) return response.writeHead(302, { Location: target }).end();
  sendJson(response, 404, { error: "not found" });
}

export function createApp(store) {
  return createServer(async (request, response) => {
    try {
      await route(store, request, response);
    } catch (error) {
      console.error(error);
      sendJson(response, 500, { error: "internal error" });
    }
  });
}
