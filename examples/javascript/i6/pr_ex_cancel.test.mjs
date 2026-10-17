import { it } from "node:test";
import assert from "node:assert/strict";
import { createClient } from "./pr_client.mjs";
import { startApi } from "./pr_server.mjs";

it("does not retry a cancelled request", async () => {
  const api = await startApi();
  try {
    api.behavior.delayMs = 200;
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 20);

    const client = createClient({ baseUrl: api.url, baseDelayMs: 1 });
    const { signal } = controller;
    const error = await client.get("/users", { signal }).catch((e) => e);

    assert.equal(error.name, "AbortError");
    assert.equal(api.stats.requests, 1);
  } finally {
    await api.stop();
  }
});
