import { it } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as sleep } from "node:timers/promises";
import { createClient } from "../src/client.mjs";
import { startApi } from "../support/api.mjs";

it("does not retry a cancelled request", async () => {
  const api = await startApi();
  try {
    api.behavior.delayMs = 300;
    const controller = new AbortController();
    const client = createClient({ baseUrl: api.url, baseDelayMs: 1 });
    const call = client.get("/users", { signal: controller.signal });

    while (api.stats.requests === 0) await sleep(1);
    controller.abort();
    const error = await call.catch((e) => e);

    assert.equal(error.name, "AbortError");
    assert.equal(api.stats.requests, 1);
  } finally {
    await api.stop();
  }
});
