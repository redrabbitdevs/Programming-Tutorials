import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
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

  it("limits how long a request may take", () => {
    assert.equal(server.requestTimeout, 10_000);
  });
});
