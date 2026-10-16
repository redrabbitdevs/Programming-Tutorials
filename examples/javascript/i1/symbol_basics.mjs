const a = Symbol("id");
const b = Symbol("id");

console.log(typeof a, a === b, a === a);
console.log(a.description, a.toString(), String(a));
console.log(Symbol().description);

try {
  console.log(`${a}`);
} catch (error) {
  console.log(error.name);
}
