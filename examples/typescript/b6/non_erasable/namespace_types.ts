namespace Shapes {
  export interface Circle {
    radius: number;
  }
}

const c: Shapes.Circle = { radius: 2 };
console.log(c);
