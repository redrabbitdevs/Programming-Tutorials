const original = {
  name: "Ada",
  scores: [90, 80],
  address: { city: "London" },
  born: new Date("1815-12-10"),
  tags: new Set(["maths"]),
};

const deep = structuredClone(original);
deep.scores.push(70);
deep.address.city = "Paris";

console.log(original.scores, original.address.city);
console.log(deep.scores, deep.address.city);
console.log(deep.born instanceof Date, deep.tags);
console.log(deep.born === original.born);

const loop = { name: "loop" };
loop.self = loop;
const loopCopy = structuredClone(loop);
console.log(loopCopy.self === loopCopy);

try {
  structuredClone({ run() {} });
} catch (error) {
  console.log(error.name);
}

class Point {
  constructor(x) {
    this.x = x;
  }
  show() {
    return this.x;
  }
}
const clone = structuredClone(new Point(1));
console.log(clone instanceof Point, clone);
