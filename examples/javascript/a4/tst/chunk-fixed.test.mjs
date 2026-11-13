import { test } from "node:test";
import assert from "node:assert/strict";
import { chunk } from "./chunk-fixed.mjs";
import { forAll } from "./property.mjs";

const options = { runs: 500, seed: 42 };

test("chunks flatten back to the input", () => {
  for (let size = 1; size <= 5; size++) {
    const failure = forAll(
      (array) => assert.deepEqual(chunk(array, size).flat(), array), options);
    assert.equal(failure, null, JSON.stringify(failure));
  }
});

test("chunks have the right lengths", () => {
  const failure = forAll((array) => {
    const chunks = chunk(array, 3);
    chunks.slice(0, -1).forEach((c) => assert.equal(c.length, 3));
    const last = chunks.at(-1);
    if (last) assert.ok(last.length >= 1 && last.length <= 3);
  }, options);
  assert.equal(failure, null, JSON.stringify(failure));
});
