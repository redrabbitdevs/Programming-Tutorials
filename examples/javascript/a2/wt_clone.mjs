class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get sum() {
    return this.x + this.y;
  }
}

const value = {
  when: new Date(0),
  tags: new Map([["a", 1]]),
  point: new Point(1, 2),
};
value.self = value;

const copy = structuredClone(value);
console.log(copy.when instanceof Date, copy.tags.get("a"));
console.log(copy.self === copy, copy === value);
console.log(copy.point, copy.point instanceof Point, copy.point.sum);

try {
  structuredClone({ greet() {} });
} catch (error) {
  console.log(error.name);
}
