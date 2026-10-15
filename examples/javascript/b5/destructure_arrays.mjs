const rgb = [255, 128, 0];
const [red, green, blue] = rgb;
console.log(red, green, blue);

const [first, , third] = ["a", "b", "c"];
console.log(first, third);

const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);

const [x = 10, y = 20] = [1];
console.log(x, y);

let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);

const [q, r] = "hi";
console.log(q, r);

const [, second] = new Set(["p", "q"]);
console.log(second);

console.log(Object.entries({ k: 1 }).map(([key, value]) => key + value));
