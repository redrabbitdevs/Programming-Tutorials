type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function radiusOf(shape: Shape): number {
  return shape.radius;
}

console.log(radiusOf({ kind: "circle", radius: 2 }));
