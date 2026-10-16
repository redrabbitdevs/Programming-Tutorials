const shape = "circle";
const size = 2;

switch (shape) {
  case "square": {
    const side = size;
    console.log(side * side);
    break;
  }
  case "circle": {
    const radius = size;
    console.log(Math.round(Math.PI * radius ** 2));
    break;
  }
  default:
    console.log(`unknown shape: ${shape}`);
}
