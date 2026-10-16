const fake = { name: "Error", message: "I am not an error" };
console.log(fake instanceof Error, Error.isError(fake));
console.log(Error.isError(new TypeError("bad type")));
console.log(Error.isError(new DOMException("stop", "AbortError")));

function describe(thrown) {
  return Error.isError(thrown)
    ? `Error: ${thrown.message}`
    : `not an Error: ${String(thrown)}`;
}
console.log(describe(new RangeError("too big")));
console.log(describe("just a string"));
