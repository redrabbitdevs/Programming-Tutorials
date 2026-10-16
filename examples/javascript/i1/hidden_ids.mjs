const id = Symbol("id");

function tag(object, value) {
  object[id] = value;
  return object;
}

const order = tag({ item: "lamp" }, 7);
const other = { item: "desk", [Symbol("id")]: 99 };

console.log(order[id], other[id]);
console.log(Object.keys(order), JSON.stringify(order));
console.log(Object.getOwnPropertySymbols(order).length);
console.log(Symbol("id") === Symbol("id"));
