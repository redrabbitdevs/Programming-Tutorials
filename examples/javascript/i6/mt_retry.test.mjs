import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { retry } from "./mt_retry.mjs";

describe("retry", () => {
  it("tries again after a failure", async () => {
    const task = mock.fn(() => "ok");
    task.mock.mockImplementationOnce(() => { throw new Error("first"); }, 0);
    task.mock.mockImplementationOnce(() => { throw new Error("second"); }, 1);

    assert.equal(await retry(task, 5), "ok");
    assert.equal(task.mock.callCount(), 3);
  });

  it("throws the last error when every attempt fails", async () => {
    const task = mock.fn(() => { throw new Error("always"); });
    await assert.rejects(retry(task, 2), { message: "always" });
    assert.equal(task.mock.callCount(), 2);
    assert.equal(task.mock.calls[1].error.message, "always");
  });
});
