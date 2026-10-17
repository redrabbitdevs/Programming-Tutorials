import { it } from "node:test";
import assert from "node:assert/strict";
import { countdown } from "./mt_ex_countdown.mjs";

it("counts down once a second", (t) => {
  t.mock.timers.enable({ apis: ["setInterval"] });
  const onTick = t.mock.fn();
  const onDone = t.mock.fn();
  countdown(3, onTick, onDone);

  t.mock.timers.tick(1000);
  assert.deepEqual(onTick.mock.calls[0].arguments, [2]);
  t.mock.timers.tick(1000);
  assert.deepEqual(onTick.mock.calls[1].arguments, [1]);
  assert.equal(onDone.mock.callCount(), 0);

  t.mock.timers.tick(1000);
  assert.equal(onDone.mock.callCount(), 1);
  assert.equal(onTick.mock.callCount(), 2);
});
