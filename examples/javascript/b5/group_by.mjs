const people = [
  { name: "Ada", team: "eng" },
  { name: "Bob", team: "ops" },
  { name: "Cy", team: "eng" },
];

const byTeam = Object.groupBy(people, (p) => p.team);
console.log(byTeam);
console.log(Object.getPrototypeOf(byTeam));

const mapped = Map.groupBy(people, (p) => p.name.length);
console.log(mapped);
console.log(mapped.get(3).map((p) => p.name));
