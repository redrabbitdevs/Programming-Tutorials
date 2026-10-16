function circle(radius) {
  return { name: "circle", area: () => Math.PI * radius ** 2 };
}

function rectangle(width, height) {
  return { name: "rectangle", area: () => width * height };
}

function square(side) {
  return { ...rectangle(side, side), name: "square" };
}

function describe(shape) {
  return `${shape.name} area ${shape.area().toFixed(2)}`;
}

for (const shape of [circle(2), rectangle(3, 4), square(3)]) {
  console.log(describe(shape));
}
