const pi = 3.14159;

const geometry = {
  pi,
  area: (radius: number): number => pi * radius * radius,
};

console.log(geometry.area(2));
