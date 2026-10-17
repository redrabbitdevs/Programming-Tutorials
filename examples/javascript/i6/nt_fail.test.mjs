import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "./nt_slug.mjs";

test("collapses repeated separators", () => {
  assert.equal(slugify("a -- b"), "a--b");
});

test("splits into words", () => {
  assert.deepEqual(slugify("v2 beta").split("-"), ["v2", "bata"]);
});

test("keeps digits", () => {
  assert.equal(slugify("Route 66"), "route-66");
});
