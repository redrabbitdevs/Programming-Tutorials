import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import { createApp } from "../server/app.mjs";
import { createStore } from "../server/store.mjs";

describe("link shortener", () => {
  const lines = [];
  let server;
  let base;
  before(async () => {
    const write = (line) => lines.push(line);
    server = createApp(createStore(), { write });
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
    assert.deepEqual(lines, ["req 1: created g8"]);

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

  it("answers 413 when the body is over 10,000 bytes", async () => {
    const url = `https://example.com/${"é".repeat(6_000)}`;
    const response = await shorten({ url });
    assert.equal(response.status, 413);
    assert.deepEqual(await response.json(), { error: "body too large" });
    assert.match(lines.at(-1), /^req \d+: 413 body too large$/);
  });

  it("decodes a character split across two chunks", async () => {
    const json = JSON.stringify({ url: "https://example.com/café" });
    const bytes = new TextEncoder().encode(json);
    const cut = bytes.indexOf(0xa9); // between the two bytes of é
    const body = new ReadableStream({
      async start(controller) {
        controller.enqueue(bytes.subarray(0, cut));
        await delay(50);
        controller.enqueue(bytes.subarray(cut));
        controller.close();
      },
    });
    const init = { method: "POST", body, duplex: "half" };
    const response = await fetch(`${base}/api/links`, init);
    assert.equal(response.status, 201);
    const link = await response.json();
    assert.equal(link.url, "https://example.com/café");
  });

  it("serves the page and 404s unknown codes", async () => {
    const page = await fetch(base);
    assert.match(page.headers.get("content-type"), /^text\/html/);
    assert.equal((await fetch(`${base}/nope`)).status, 404);
  });
});
