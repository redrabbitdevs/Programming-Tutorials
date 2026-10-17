import { it } from "node:test";
import assert from "node:assert/strict";
import { createClient } from "../src/client.mjs";
import { HttpError } from "../src/errors.mjs";
import { startApi } from "../support/api.mjs";

it("does not repeat a POST after a 503", async () => {
  const api = await startApi();
  try {
    const client = createClient({ baseUrl: api.url, wait: async () => {} });

    api.behavior.failures = 1;
    const posting = client.post("/users", { name: "Edsger" });
    const error = await posting.catch((e) => e);
    assert.ok(error instanceof HttpError);
    assert.equal(error.status, 503);
    assert.equal(api.stats.requests, 1);

    api.stats.requests = 0;
    api.behavior.failures = 1;
    await client.get("/users");
    assert.equal(api.stats.requests, 2);
  } finally {
    await api.stop();
  }
});
