function getX(point) {
  return point.x;
}

const shapes = [
  { x: 1 },
  { x: 1, y: 2 },
  { x: 1, z: 3 },
  { x: 1, w: 4 },
  { x: 1, v: 5 },
];
for (const shape of shapes) getX(shape);
