import { it } from "node:test";
import assert from "node:assert/strict";
import { pickRandom } from "./mt_pick.mjs";

const items = ["red", "green", "blue"];

it("picks the first item for a random value near 0", (t) => {
  t.mock.method(Math, "random", () => 0);
  assert.equal(pickRandom(items), "red");
});

it("picks the last item for a random value near 1", (t) => {
  t.mock.method(Math, "random", () => 0.99);
  assert.equal(pickRandom(items), "blue");
});

it("has the real Math.random back afterwards", () => {
  assert.equal(Math.random.mock, undefined);
});
