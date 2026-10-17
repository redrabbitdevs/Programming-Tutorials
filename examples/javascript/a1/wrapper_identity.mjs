function original(a, b) {
  return a + b;
}

const wrap = (fn) =>
  function (...args) {
    return fn.apply(this, args);
  };

const wrapped = wrap(original);
console.log(original.name, original.length);
console.log(JSON.stringify(wrapped.name), wrapped.length);
console.log(wrapped(2, 3), wrapped === original);
