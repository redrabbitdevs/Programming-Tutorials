import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { median } from "./nt_ex_median.mjs";

describe("median", () => {
  it("middle of an odd count", () => {
    assert.equal(median([3, 1, 2]), 2);
  });

  it("mean of the middle two for an even count", () => {
    assert.equal(median([1, 2, 3, 4]), 2.5);
  });

  it("sorts numbers, not text", () => {
    assert.equal(median([10, 9, 2]), 9);
  });

  it("does not change its input", () => {
    const input = [3, 1, 2];
    median(input);
    assert.deepEqual(input, [3, 1, 2]);
  });

  it("throws for an empty array", () => {
    assert.throws(() => median([]), RangeError);
  });
});
