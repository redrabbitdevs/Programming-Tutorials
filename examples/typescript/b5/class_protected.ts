class Shape {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Circle extends Shape {
  describe(): string {
    return `a ${this.name}`;
  }
}

console.log(new Circle("circle").describe());
