import { it } from "node:test";
import assert from "node:assert/strict";
import { makeId } from "./mt_ex_id.mjs";

it("combines the clock and a random number", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 5000 });
  const random = t.mock.method(Math, "random", () => 0.25);

  assert.equal(makeId(), "5000-250");
  assert.equal(random.mock.callCount(), 1);
});
