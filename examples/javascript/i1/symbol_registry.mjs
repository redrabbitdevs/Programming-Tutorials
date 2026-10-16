const local = Symbol("shared");
const first = Symbol.for("app.shared");
const second = Symbol.for("app.shared");

console.log(first === second, first === local);
console.log(Symbol.keyFor(first), Symbol.keyFor(local));
