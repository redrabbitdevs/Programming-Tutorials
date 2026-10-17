import { it } from "node:test";
import assert from "node:assert/strict";
import { waitFor } from "./mt_poll.mjs";

const flush = () => new Promise((resolve) => setImmediate(resolve));

it("polls on a timer until the check passes", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let ready = false;
  const result = waitFor(() => ready, 1000, 5);

  await flush();
  t.mock.timers.tick(1000);
  await flush();
  ready = true;
  t.mock.timers.tick(1000);

  assert.equal(await result, 2);
});
