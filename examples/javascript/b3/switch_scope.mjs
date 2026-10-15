function area(shape, size) {
  switch (shape) {
    case "square": {
      const side = size;
      return side * side;
    }
    case "circle": {
      const radius = size;
      return Math.round(Math.PI * radius ** 2);
    }
    default:
      throw new Error(`unknown shape: ${shape}`);
  }
}

console.log(area("square", 3), area("circle", 2));
