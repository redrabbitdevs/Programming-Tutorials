function build(order) {
  const point = {};
  for (const key of order) point[key] = 0;
  return point;
}

const p = build(["x", "y"]);
const q = build(["x", "y"]);
const r = build(["y", "x"]);
console.log("same order:", %HaveSameMap(p, q));
console.log("other order:", %HaveSameMap(p, r));
