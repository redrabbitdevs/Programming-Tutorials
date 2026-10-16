class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  toString() {
    return `${this.width}x${this.height}`;
  }
}

const r = new Rectangle(4, 3);
console.log(r.area(), `${r}`);
console.log(r);
