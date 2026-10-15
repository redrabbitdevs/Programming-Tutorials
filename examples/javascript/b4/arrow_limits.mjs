const Point = (x, y) => ({ x, y });

try {
  new Point(1, 2);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

function Plain(x) {
  this.x = x;
}
console.log(new Plain(5).x);
