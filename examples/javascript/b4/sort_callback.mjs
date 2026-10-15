const numbers = [10, 9, 1, 100];
console.log([...numbers].sort());
console.log([...numbers].sort((a, b) => a - b));
console.log([...numbers].sort((a, b) => b - a));

const people = [
  { name: "Grace", age: 85 },
  { name: "Ada", age: 36 },
  { name: "Linus", age: 55 },
];
console.log(people.sort((a, b) => a.age - b.age).map((p) => p.name));
