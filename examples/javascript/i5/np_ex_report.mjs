const text = `{
  "dependencies": { "zod": "^3.0.0", "chalk": "~5.3.0" },
  "devDependencies": { "eslint": "^9.0.0" }
}`;
const pkg = JSON.parse(text);

const entries = (section, tag) =>
  Object.entries(pkg[section] ?? {}).map(([name, range]) => [name, range, tag]);

const rows = [
  ...entries("dependencies", ""),
  ...entries("devDependencies", " (dev)"),
];
rows.sort(([a], [b]) => a.localeCompare(b));
for (const [name, range, tag] of rows) console.log(`${name} ${range}${tag}`);
