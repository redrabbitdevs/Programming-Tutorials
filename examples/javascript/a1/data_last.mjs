const pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);
const prop = (name) => (object) => object[name];
const where = (name, value) => (object) => object[name] === value;
const sortBy = (name) => (list) =>
  list.toSorted((a, b) => (a[name] < b[name] ? -1 : 1));

const people = [
  { name: "Kai", team: "red", age: 31 },
  { name: "Bo", team: "blue", age: 25 },
  { name: "Ari", team: "red", age: 22 },
];
const redNames = pipe(
  (list) => list.filter(where("team", "red")),
  sortBy("age"),
  (list) => list.map(prop("name")),
);
console.log(redNames(people));
