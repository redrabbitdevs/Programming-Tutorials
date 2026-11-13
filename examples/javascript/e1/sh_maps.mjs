const a = { x: 1, y: 2 };
const b = { x: 10, y: 20 };
const c = { y: 2, x: 1 };
console.log("a and b:", %HaveSameMap(a, b));
console.log("a and c:", %HaveSameMap(a, c));

const d = { x: 1 };
d.y = 2;
console.log("a and d:", %HaveSameMap(a, d));

const e = { x: 1, y: 2 };
e.z = 3;
console.log("a and e:", %HaveSameMap(a, e));
