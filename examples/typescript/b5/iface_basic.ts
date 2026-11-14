interface Point {
  x: number;
  y: number;
}

type PointAlias = {
  x: number;
  y: number;
};

function distance(a: Point, b: PointAlias): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 }));
