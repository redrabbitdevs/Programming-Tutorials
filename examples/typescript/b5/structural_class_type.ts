class Point {
  x = 0;
  y = 0;
}

const plain: Point = { x: 1, y: 2 };

function norm(point: Point): number {
  return Math.hypot(point.x, point.y);
}

console.log(norm(plain), norm({ x: 3, y: 4 }));
