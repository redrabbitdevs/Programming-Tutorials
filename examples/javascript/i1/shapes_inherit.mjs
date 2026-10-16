class Shape {
  get name() {
    return this.constructor.name.toLowerCase();
  }

  area() {
    throw new Error("area() must be overridden");
  }

  describe() {
    return `${this.name} area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

for (const shape of [new Circle(2), new Rectangle(3, 4), new Square(3)]) {
  console.log(shape.describe());
}
