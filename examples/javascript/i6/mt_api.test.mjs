import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getUser } from "./mt_api.mjs";

describe("getUser", () => {
  it("returns the parsed JSON body", async (t) => {
    const reply = () => new Response(JSON.stringify({ name: "Ada" }));
    const fetchMock = t.mock.method(globalThis, "fetch", async () => reply());

    assert.deepEqual(await getUser(7), { name: "Ada" });
    assert.equal(fetchMock.mock.callCount(), 1);
    const [address] = fetchMock.mock.calls[0].arguments;
    assert.equal(address, "https://api.example.test/users/7");
  });

  it("throws on an HTTP error", async (t) => {
    const notFound = async () => new Response("", { status: 404 });
    t.mock.method(globalThis, "fetch", notFound);
    await assert.rejects(getUser(8), { message: "HTTP 404" });
  });
});
