import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../server/app.mjs";
import { createStore } from "../server/store.mjs";

describe("link shortener", () => {
  let server;
  let base;
  before(async () => {
    server = createApp(createStore());
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  });
  after(() => server.close());

  const shorten = (body) => fetch(`${base}/api/links`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  it("shortens a link and redirects to it", async () => {
    const created = await shorten({ url: "https://example.com/a/long/path" });
    assert.equal(created.status, 201);
    const { code } = await created.json();
    assert.equal(code, "g8");

    const visit = await fetch(`${base}/${code}`, { redirect: "manual" });
    assert.equal(visit.status, 302);
    const location = visit.headers.get("location");
    assert.equal(location, "https://example.com/a/long/path");

    const stats = await (await fetch(`${base}/api/links/${code}`)).json();
    assert.equal(stats.visits, 1);
  });

  it("rejects links that are not http or https", async () => {
    for (const url of ["javascript:alert(1)", "not a url"]) {
      const response = await shorten({ url });
      assert.equal(response.status, 400);
    }
  });

  it("rejects bodies over the size limit", async () => {
    const url = `https://example.com/${"x".repeat(20_000)}`;
    const response = await shorten({ url });
    assert.equal(response.status, 400);
  });

  it("serves the page and 404s unknown codes", async () => {
    const page = await fetch(base);
    assert.match(page.headers.get("content-type"), /^text\/html/);
    assert.equal((await fetch(`${base}/nope`)).status, 404);
  });
});
