import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { debounce } from "./mt_debounce.mjs";

describe("debounce", () => {
  it("runs once, with the latest arguments, after the quiet period", (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const spy = t.mock.fn();
    const save = debounce(spy, 100);

    save("a");
    t.mock.timers.tick(50);
    save("b");
    t.mock.timers.tick(99);
    assert.equal(spy.mock.callCount(), 0);

    t.mock.timers.tick(1);
    assert.equal(spy.mock.callCount(), 1);
    assert.deepEqual(spy.mock.calls[0].arguments, ["b"]);
  });
});
