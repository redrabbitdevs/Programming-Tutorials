class Shape {
  protected name = "shape";
}

class Circle extends Shape {}

const circle = new Circle();
console.log(circle.name);
