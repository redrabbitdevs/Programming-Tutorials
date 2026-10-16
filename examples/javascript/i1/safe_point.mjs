function Point(x, y) {
  if (!(this instanceof Point)) {
    return new Point(x, y);
  }
  this.x = x;
  this.y = y;
}

console.log(new Point(1, 2));
console.log(Point(3, 4));
