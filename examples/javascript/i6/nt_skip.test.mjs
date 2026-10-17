import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("flags", () => {
  it("runs normally", () => {
    assert.ok(true);
  });

  it.skip("is skipped", () => {
    assert.fail("never runs");
  });

  it("is skipped with a reason", { skip: "needs a database" }, () => {
    assert.fail("never runs");
  });

  it.todo("is planned");
});
