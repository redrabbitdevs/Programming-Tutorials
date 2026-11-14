abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  override area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rect extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  override area(): number {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Circle(1), new Rect(2, 3)];
for (const shape of shapes) {
  console.log(shape.area().toFixed(2));
}
