import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { createApp } from "../server/app.mjs";
import { createStore } from "../server/store.mjs";

describe("security review fixes", () => {
  let server;
  let base;
  before(async () => {
    server = createApp(createStore(), { write: () => {} });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  });
  after(() => server.close());

  const shorten = (url) => fetch(`${base}/api/links`, {
    method: "POST",
    body: JSON.stringify({ url }),
  });

  it("sends a strict CSP and nosniff on every response", async () => {
    for (const path of ["/", "/api/links/nope", "/nope"]) {
      const { headers } = await fetch(base + path);
      assert.match(headers.get("content-security-policy"),
        /default-src 'self'.*require-trusted-types-for 'script'/);
      assert.equal(headers.get("x-content-type-options"), "nosniff");
    }
  });

  it("rejects links with line breaks or credentials", async () => {
    const cases = {
      "https://example.com/a\r\nSet-Cookie: x=1":
        "no spaces or control characters",
      "https://bank.example@phish.example/login":
        "no user names or passwords in links",
    };
    for (const [url, error] of Object.entries(cases)) {
      const response = await shorten(url);
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { error });
    }
  });

  it("treats prototype names as unknown codes", async () => {
    for (const code of ["constructor", "__proto__", "toString"]) {
      assert.equal((await fetch(`${base}/api/links/${code}`)).status, 404);
      const visit = await fetch(`${base}/${code}`, { redirect: "manual" });
      assert.equal(visit.status, 404);
    }
  });

  // A child process starts the app, requests the page and then an unknown
  // code, and prints each status and error. It runs from the app folder.
  const child = `
    import { createApp } from "./server/app.mjs";
    import { createStore } from "./server/store.mjs";
    const server = createApp(createStore(), { write: () => {} });
    await new Promise((done) => server.listen(0, "127.0.0.1", done));
    const base = "http://127.0.0.1:" + server.address().port;
    for (const path of ["/", "/api/links/nope"]) {
      const response = await fetch(base + path);
      console.log(response.status, (await response.json()).error);
    }
    server.close();`;

  it("answers 500 when a file read fails, and keeps serving", () => {
    // No read grant for public/, so reading index.html fails. --allow-net
    // exists from Node 25; on 22 and 24 the network is open anyway.
    const flags = ["--permission", "--allow-fs-read=server",
      "--allow-fs-read=shared", "--input-type=module", "-e", child];
    if (process.allowedNodeEnvironmentFlags.has("--allow-net")) {
      flags.unshift("--allow-net");
    }
    const output = execFileSync(process.execPath, flags,
      { cwd: join(import.meta.dirname, ".."), encoding: "utf8" });
    assert.equal(output, "500 internal error\n404 not found\n");
  });

  it("limits how long a request may take", () => {
    assert.equal(server.requestTimeout, 10_000);
  });
});
