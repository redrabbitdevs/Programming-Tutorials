import { test } from "node:test";
import assert from "node:assert/strict";
import { fizzbuzz } from "./nt_ex_fizz.mjs";

test("fizzbuzz", async (t) => {
  const cases = [[1, "1"], [3, "Fizz"], [5, "Buzz"], [15, "FizzBuzz"]];
  for (const [input, expected] of cases) {
    await t.test(`fizzbuzz(${input})`, () => {
      assert.equal(fizzbuzz(input), expected);
    });
  }
});
