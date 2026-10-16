const ids = new WeakMap();
let nextId = 1;

function idOf(object) {
  if (!ids.has(object)) {
    ids.set(object, nextId);
    nextId += 1;
  }
  return ids.get(object);
}

const first = {};
const second = {};
console.log(idOf(first), idOf(second), idOf(first));
console.log(idOf([]), first);
