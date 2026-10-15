function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const init = once((name) => {
  console.log("initialising", name);
  return name.toUpperCase();
});

console.log(init("db"));
console.log(init("other"));
console.log(init("again"));
