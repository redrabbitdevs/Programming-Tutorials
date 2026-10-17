import { describe, it, before, after, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";
import { createClient, HttpError } from "./pr_client.mjs";
import { startApi } from "./pr_server.mjs";

describe("api client", () => {
  let api;
  before(async () => {
    api = await startApi();
  });
  after(() => api.stop());
  beforeEach(() => {
    api.stats.requests = 0;
    api.behavior.failures = 0;
    api.behavior.delayMs = 0;
  });

  const client = (options) => createClient({ baseUrl: api.url, ...options });

  it("returns the parsed JSON of a successful GET", async () => {
    assert.deepEqual(await client().get("/users/1"), { id: 1, name: "Ada" });
  });

  it("throws an HttpError for a 404, without retrying", async () => {
    const error = await client().get("/users/99").catch((e) => e);
    assert.ok(error instanceof HttpError);
    assert.equal(error.status, 404);
    assert.deepEqual(error.body, { error: "not found" });
    assert.equal(api.stats.requests, 1);
  });

  it("retries a 503 with doubling delays", async () => {
    api.behavior.failures = 2;
    const wait = mock.fn(async () => {});
    const result = await client({ wait }).get("/users/2");

    assert.deepEqual(result, { id: 2, name: "Alan" });
    assert.equal(api.stats.requests, 3);
    const delays = wait.mock.calls.map((call) => call.arguments[0]);
    assert.deepEqual(delays, [100, 200]);
  });

  it("gives up after the allowed retries", async () => {
    api.behavior.failures = 10;
    const wait = async () => {};
    const failing = client({ wait, retries: 2 });
    const error = await failing.get("/users").catch((e) => e);

    assert.equal(error.status, 503);
    assert.equal(api.stats.requests, 3);
  });

  it("sends a POST body as JSON", async () => {
    const created = await client().post("/users", { name: "Grace" });
    assert.deepEqual(created, { id: 3, name: "Grace" });
  });

  it("times out a slow answer", async () => {
    api.behavior.delayMs = 200;
    const slow = client({ timeoutMs: 20, retries: 0 });
    const error = await slow.get("/users").catch((e) => e);
    assert.equal(error.name, "TimeoutError");
  });
});
