function makeLimiter(max, action) {
  let used = 0;
  return (...args) => {
    if (used >= max) {
      return "limit reached";
    }
    used += 1;
    return action(...args);
  };
}

const greet = makeLimiter(2, (name) => `hello ${name}`);
console.log(greet("Ada"));
console.log(greet("Grace"));
console.log(greet("Linus"));

const double = makeLimiter(1, (n) => n * 2);
console.log(double(21), double(5), greet("again"));
