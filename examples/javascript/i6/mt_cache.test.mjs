import { it } from "node:test";
import assert from "node:assert/strict";
import { TtlCache } from "./mt_cache.mjs";

it("forgets an entry when its time-to-live has passed", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 0 });
  const cache = new TtlCache(1000);

  cache.set("a", 1);
  t.mock.timers.tick(999);
  assert.equal(cache.get("a"), 1);

  t.mock.timers.tick(1);
  assert.equal(cache.get("a"), undefined);
});
