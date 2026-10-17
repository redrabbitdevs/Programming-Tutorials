let parses = 0;
const cache = new WeakMap();

function template(strings, ...values) {
  if (!cache.has(strings)) {
    parses += 1;
    cache.set(strings, strings.join("{}"));
  }
  return `${cache.get(strings)} <- ${values.join(", ")}`;
}

const greet = (who) => template`Hello ${who}!`;
console.log(greet("Ada"), "|", greet("Lin"));
console.log(template`Hello ${"Bo"}!`);
console.log("parses:", parses);

const pieces = ((strings) => strings)`a${1}b`;
console.log(Object.isFrozen(pieces), Object.isFrozen(pieces.raw));
