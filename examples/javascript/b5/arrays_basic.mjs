const fruits = ["apple", "banana", "cherry"];
console.log(fruits);
console.log(fruits[0], fruits[2], fruits[3]);
console.log(fruits.length);

fruits[1] = "blueberry";
console.log(fruits);

console.log(fruits.at(-1), fruits.at(-2));
console.log(fruits[fruits.length - 1]);

const mixed = [1, "two", true, null, [3, 4], { five: 5 }];
console.log(mixed);
console.log(typeof fruits, Array.isArray(fruits), Array.isArray("abc"));
