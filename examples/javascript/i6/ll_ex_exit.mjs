function summarize(results) {
  const errors = results.filter((r) => r.severity === 2).length;
  const warnings = results.filter((r) => r.severity === 1).length;
  return { errors, warnings, exitCode: errors > 0 ? 1 : 0 };
}

console.log(summarize([]));
console.log(summarize([
  { rule: "prefer-const", severity: 1 },
  { rule: "no-console", severity: 1 },
]));
console.log(summarize([
  { rule: "prefer-const", severity: 1 },
  { rule: "eqeqeq", severity: 2 },
]));
