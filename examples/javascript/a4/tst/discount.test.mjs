import { test } from "node:test";
import assert from "node:assert/strict";
import { discount } from "./discount.mjs";

test("discount steps", () => {
  assert.equal(discount(20), 0);
  assert.equal(discount(60), 5);
  assert.equal(discount(150), 10);
});
