const compose = (...fns) => (x) => fns.reduceRight((value, fn) => fn(value), x);

const trim = (s) => s.trim();
const lower = (s) => s.toLowerCase();
const exclaim = (s) => `${s}!`;

const clean = compose(exclaim, lower, trim);
console.log(clean("  HeLLo  "));
