type Circle = { radius: number };
type Rectangle = { width: number; height: number };

function area(shape: Circle | Rectangle): number {
  if ("radius" in shape) {
    return Math.PI * shape.radius ** 2;
  }
  return shape.width * shape.height;
}

console.log(area({ radius: 1 }).toFixed(2));
console.log(area({ width: 3, height: 4 }));
