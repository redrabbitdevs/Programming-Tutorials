class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

try {
  Point(1, 2);
} catch (error) {
  console.log(error.name, error.message);
}

try {
  new Later();
} catch (error) {
  console.log(error.name);
}

class Later {}
