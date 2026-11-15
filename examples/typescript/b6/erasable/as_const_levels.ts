const levels = ["low", "medium", "high"] as const;

for (const level of levels) {
  console.log(level.toUpperCase());
}

const first: "low" | "medium" | "high" = levels[0];
console.log(first);
