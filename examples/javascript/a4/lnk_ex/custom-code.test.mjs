import { test } from "node:test";
import assert from "node:assert/strict";
import { createCustomStore } from "./custom-store.mjs";
import { chooseCode } from "./custom-code.mjs";

const url = "https://example.com/";

test("uses a valid custom code", () => {
  const result = chooseCode(createCustomStore(), { url, code: "my-link" });
  assert.deepEqual(result, { status: 201, link: { code: "my-link", url, visits: 0 } });
});

test("rejects an invalid code", () => {
  const result = chooseCode(createCustomStore(), { url, code: "no spaces" });
  assert.deepEqual(result, { status: 400, error: "invalid code" });
});

test("refuses a taken code", () => {
  const store = createCustomStore();
  chooseCode(store, { url, code: "taken" });
  assert.equal(chooseCode(store, { url, code: "taken" }).status, 409);
});
