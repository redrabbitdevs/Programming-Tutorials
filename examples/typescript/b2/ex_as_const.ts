const point = { x: 1, y: 2 } as const;
// @ts-expect-error: as const makes x readonly
point.x = 5;
console.log(point);
