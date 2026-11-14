interface Point {
  readonly x: number;
  readonly y: number;
}

const start: Point = { x: 0, y: 0 };
start.x = 5;
console.log(start);
