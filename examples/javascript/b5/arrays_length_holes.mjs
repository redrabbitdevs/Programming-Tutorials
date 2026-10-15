const items = [1, 2, 3, 4, 5];
items.length = 2;
console.log(items);

items[4] = "far";
console.log(items, items.length);
console.log(1 in items, 3 in items);

console.log(new Array(3));
console.log(Array(3).fill(0));
console.log(Array.from({ length: 3 }, (_, i) => i * i));
console.log(Array.of(3));
console.log(new Array(3).length, new Array("3").length);

for (const [i, x] of ["a", "b"].entries()) {
  console.log(i, x);
}
