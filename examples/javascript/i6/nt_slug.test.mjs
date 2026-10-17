import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "./nt_slug.mjs";

test("lowercases and joins words with hyphens", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("drops punctuation and trims", () => {
  assert.equal(slugify("  Node.js: a tour!  "), "node-js-a-tour");
});

test("an empty string stays empty", () => {
  assert.equal(slugify(""), "");
});
