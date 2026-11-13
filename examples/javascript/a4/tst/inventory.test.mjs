import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { createInventory } from "./inventory.mjs";

describe("inventory API", () => {
  let server;
  let base;

  before(async () => {
    server = createInventory();
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  });

  after(() => server.close());

  it("creates an item and reads it back", async () => {
    const created = await fetch(`${base}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "tea", qty: 3 }),
    });
    assert.equal(created.status, 201);
    const { id } = await created.json();
    const read = await fetch(`${base}/items/${id}`);
    assert.deepEqual(await read.json(), { id, name: "tea", qty: 3 });
  });

  it("answers 404 for an unknown item", async () => {
    const response = await fetch(`${base}/items/999`);
    assert.equal(response.status, 404);
  });
});
