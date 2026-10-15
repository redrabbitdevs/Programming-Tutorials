const point = { x: 1, y: 2, label: undefined };

console.log("x" in point, "z" in point);
console.log("label" in point, point.label !== undefined);
console.log(Object.hasOwn(point, "x"), Object.hasOwn(point, "toString"));
console.log("toString" in point);

console.log(Object.keys(point));
console.log(Object.values(point));
console.log(Object.entries(point));

for (const [key, value] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, "=", value);
}

const prices = { apple: 1, pear: 2 };
const doubled = Object.fromEntries(
  Object.entries(prices).map(([name, price]) => [name, price * 2]),
);
console.log(doubled);

const messy = { b: 1, 2: "two", a: 2, 1: "one" };
console.log(Object.keys(messy));
