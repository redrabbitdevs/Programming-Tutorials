import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Cart } from "./nt_cart.mjs";

describe("Cart", () => {
  let cart;
  beforeEach(() => {
    cart = new Cart();
  });

  it("starts empty", () => {
    assert.equal(cart.count, 0);
    assert.equal(cart.total(), 0);
  });

  describe("add", () => {
    it("counts quantities", () => {
      cart.add("pen", 2, 3).add("ink", 5);
      assert.equal(cart.count, 4);
    });

    it("sums price times quantity", () => {
      cart.add("pen", 2, 3).add("ink", 5);
      assert.equal(cart.total(), 11);
    });

    it("rejects negative prices", () => {
      assert.throws(() => cart.add("pen", -1), {
        name: "RangeError",
        message: "price must not be negative",
      });
    });
  });
});
