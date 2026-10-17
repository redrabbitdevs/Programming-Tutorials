import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { findUser } from "./nt_lookup.mjs";

describe("findUser", () => {
  it("resolves with the user", async () => {
    assert.deepEqual(await findUser(1), { id: 1, name: "Ada" });
  });

  it("rejects for an unknown id", async () => {
    await assert.rejects(findUser(9), { message: "no user 9" });
  });
});
