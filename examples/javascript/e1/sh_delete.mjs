class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
console.log("two Points:", %HaveSameMap(new Point(1, 2), new Point(3, 4)));

const s = new Point(1, 2);
delete s.y;
console.log("after delete, fast:", %HasFastProperties(s));

const t = new Point(1, 2);
t.y = undefined;
console.log("set to undefined, fast:", %HasFastProperties(t));
