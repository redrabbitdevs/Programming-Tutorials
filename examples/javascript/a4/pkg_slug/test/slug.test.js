import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "@example/slug";

test("lowercases and joins words with hyphens", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("removes accents and punctuation", () => {
  assert.equal(slugify("Crème Brûlée: A History"), "creme-brulee-a-history");
});
