const base = { kind: "base", shared() {} };
const child = Object.create(base);
child.own = 1;

console.log(Object.hasOwn(child, "own"), Object.hasOwn(child, "kind"));
console.log("own" in child, "kind" in child, "missing" in child);
console.log(Object.keys(child));

for (const key in child) {
  console.log("for...in:", key);
}
