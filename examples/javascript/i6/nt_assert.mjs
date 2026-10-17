import assert from "node:assert/strict";
import loose from "node:assert";

function firstLine(fn) {
  try {
    fn();
  } catch (error) {
    return error.message.split("\n")[0];
  }
}

console.log(firstLine(() => assert.equal(1 + 1, 3)));
console.log(firstLine(() => assert.deepEqual({ a: 1 }, { a: "1" })));
console.log(firstLine(() => assert.ok(0, "zero is falsy")));

loose.equal("1", 1);
console.log("the loose module accepts '1' == 1");
assert.throws(() => assert.equal("1", 1), { code: "ERR_ASSERTION" });
console.log("the strict module does not");
