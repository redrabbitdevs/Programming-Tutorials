import { test } from "node:test";
import assert from "node:assert/strict";
import { grade } from "./nt_grade.mjs";

test("passes at 50 and fails below", () => {
  assert.equal(grade(50), "pass");
  assert.equal(grade(49), "fail");
});
