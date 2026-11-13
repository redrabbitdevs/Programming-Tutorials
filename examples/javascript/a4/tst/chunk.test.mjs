import { test } from "node:test";
import assert from "node:assert/strict";
import { chunk } from "./chunk.mjs";
import { forAll } from "./property.mjs";

test("chunks flatten back to the input", () => {
  const failure = forAll((array) => {
    assert.deepEqual(chunk(array, 3).flat(), array);
  });
  assert.equal(failure, null, JSON.stringify(failure));
});
