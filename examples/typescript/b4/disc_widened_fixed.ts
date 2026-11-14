type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function perimeter(shape: Shape): number {
  return shape.kind === "circle" ? 2 * Math.PI * shape.radius : shape.side * 4;
}

const unit: Shape = { kind: "square", side: 1 };
console.log(perimeter(unit));
