type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default: {
      const unreachable: never = shape;
      return unreachable;
    }
  }
}

console.log(area({ kind: "square", side: 4 }));
