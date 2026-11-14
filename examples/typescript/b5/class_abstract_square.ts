abstract class Shape {
  abstract area(): number;

  describe(): string {
    return `area ${this.area().toFixed(2)}`;
  }
}

class Square extends Shape {
  side = 3;

  area(): number {
    return this.side ** 2;
  }
}

console.log(new Square().describe());
