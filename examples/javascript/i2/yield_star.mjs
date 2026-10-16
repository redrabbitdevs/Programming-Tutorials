function* inner() {
  yield "a";
  yield "b";
  return "inner finished";
}

function* outer() {
  yield 1;
  const result = yield* inner();
  yield result;
  yield* [2, 3];
  yield* "xy";
}

console.log([...outer()]);
