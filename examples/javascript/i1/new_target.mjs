class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new TypeError("Shape is abstract: extend it");
    }
    console.log("building a", new.target.name);
  }
}

class Dot extends Shape {}

console.log(new Dot() instanceof Shape);
try {
  new Shape();
} catch (error) {
  console.log(error.message);
}
