const point = { x: 3, y: 4 };
for (const key in point) {
  console.log(key, point[key]);
}

for (const key in ["a", "b"]) {
  console.log(key, typeof key);
}

for (const [key, value] of Object.entries(point)) {
  console.log(`${key}=${value}`);
}

const parent = { inherited: true };
const child = Object.create(parent);
child.own = 1;
for (const key in child) {
  console.log(key);
}
console.log(Object.keys(child));
