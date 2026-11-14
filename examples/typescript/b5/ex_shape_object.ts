interface Shape {
  area(): number;
}

class Square implements Shape {
  side: number;

  constructor(side: number) {
    this.side = side;
  }

  area(): number {
    return this.side ** 2;
  }
}

const unitCircle: Shape = { area: () => Math.PI };

const shapes: Shape[] = [new Square(2), unitCircle];
console.log(shapes.map((shape) => shape.area().toFixed(2)));
