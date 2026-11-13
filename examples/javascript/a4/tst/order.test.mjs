import { test } from "node:test";
import assert from "node:assert/strict";

const cart = [];

test("adds an item", () => {
  cart.push("tea");
  assert.equal(cart.length, 1);
});

test("lists the cart", () => {
  assert.deepEqual(cart, ["tea"]);
});
