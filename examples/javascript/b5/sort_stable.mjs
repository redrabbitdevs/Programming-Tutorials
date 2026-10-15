const tasks = [
  { title: "write", priority: 2 },
  { title: "test", priority: 1 },
  { title: "deploy", priority: 2 },
  { title: "plan", priority: 1 },
];

const byPriority = tasks.toSorted((a, b) => a.priority - b.priority);
console.log(byPriority.map((t) => t.title));

const broken = [5, 1, 4].sort((a, b) => a > b);
console.log(broken);
