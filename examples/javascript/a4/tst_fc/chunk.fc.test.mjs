import { test } from "node:test";
import fc from "fast-check";
import assert from "node:assert/strict";
import { chunk } from "../tst/chunk.mjs";

test("chunks flatten back to the input", () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), fc.integer({ min: 1, max: 10 }),
      (array, size) => {
        assert.deepEqual(chunk(array, size).flat(), array);
      }),
  );
});
