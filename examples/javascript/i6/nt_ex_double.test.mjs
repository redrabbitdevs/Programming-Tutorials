import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { doubleLater } from "./nt_ex_double.mjs";

describe("doubleLater", () => {
  it("doubles a number", async () => {
    assert.equal(await doubleLater(21), 42);
  });

  it("rejects other types", async () => {
    await assert.rejects(doubleLater("21"), {
      name: "TypeError",
      message: "number expected",
    });
  });
});
