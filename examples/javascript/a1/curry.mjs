function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}

const between = curry((min, max, n) => n >= min && n <= max);
console.log(between(1, 10, 5), between(1)(10)(50), between(1, 10)(7));

const isDigitCode = between(48, 57);
console.log([..."a1b2"].map((c) => isDigitCode(c.charCodeAt(0))));

console.log(((a, b) => 0).length, ((a, b = 1) => 0).length);
console.log(((...all) => 0).length, ((a, ...rest) => 0).length);

const greet = curry((greeting, name = "you") => `${greeting}, ${name}`);
console.log(greet("Hi"));
