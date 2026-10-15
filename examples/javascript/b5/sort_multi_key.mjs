const staff = [
  { name: "Grace", dept: "eng", age: 45 },
  { name: "Ada", dept: "ops", age: 36 },
  { name: "Linus", dept: "eng", age: 30 },
  { name: "Alan", dept: "ops", age: 36 },
  { name: "Barbara", dept: "eng", age: 45 },
];

const sorted = staff.toSorted(
  (a, b) =>
    a.dept.localeCompare(b.dept, "en") ||
    b.age - a.age ||
    a.name.localeCompare(b.name, "en"),
);

for (const p of sorted) {
  console.log(p.dept, p.age, p.name);
}
console.log(staff[0].name);
