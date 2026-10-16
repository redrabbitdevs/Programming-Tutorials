const cache = new WeakMap();
const key = Symbol("job");

cache.set(key, "result");
console.log(cache.get(key), cache.has(key));

try {
  cache.set(Symbol.for("registered"), "no");
} catch (error) {
  console.log(error.name);
}
