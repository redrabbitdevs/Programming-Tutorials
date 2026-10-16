const joined = Iterator.concat([1, 2], new Set([3]), [4].values());
console.log(joined.toArray());

function* tail() {
  yield "x";
  yield "y";
}

const mixed = Iterator.concat(["w"], tail());
console.log(mixed.map((s) => s.toUpperCase()).toArray());
