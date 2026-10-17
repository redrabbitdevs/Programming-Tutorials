export const point = { x: 1, y: 2 };
export function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
