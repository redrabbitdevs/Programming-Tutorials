class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  norm() {
    return Math.hypot(this.x, this.y);
  }
}

const p = new Point(3, 4);
console.log(typeof Point, Object.getPrototypeOf(p) === Point.prototype);
console.log(Object.hasOwn(p, "norm"), Object.hasOwn(Point.prototype, "norm"));
console.log(Object.keys(Point.prototype));
console.log(p.norm === new Point(0, 0).norm);
