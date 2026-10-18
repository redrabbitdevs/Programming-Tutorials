import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { createInventory } from "./inventory.mjs";

describe("inventory API errors", () => {
  let server;
  let base;
  before(async () => {
    server = createInventory();
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  });
  after(() => server.close());

  const post = (body) => fetch(`${base}/items`, { method: "POST", body });

  it("rejects a body that is not JSON", async () => {
    assert.equal((await post("not json")).status, 400);
  });

  it("requires a quantity", async () => {
    const response = await post(JSON.stringify({ name: "tea" }));
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "name and qty required" });
  });

  it("always answers with JSON", async () => {
    const responses = [await post("x"), await fetch(`${base}/nowhere`)];
    for (const response of responses) {
      assert.equal(response.headers.get("content-type"), "application/json");
    }
  });
});
