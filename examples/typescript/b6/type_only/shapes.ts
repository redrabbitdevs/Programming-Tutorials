export interface Shape {
  w: number;
}

export type Id = number;

export function area(shape: Shape): number {
  return shape.w * shape.w;
}
