import { readFileSync } from "node:fs";

const file = process.argv[2];
const snapshot = JSON.parse(readFileSync(file, "utf8"));
const { node_fields, node_types } = snapshot.snapshot.meta;
const typeNames = node_types[0];
const width = node_fields.length;
const typeAt = node_fields.indexOf("type");
const nameAt = node_fields.indexOf("name");

const counts = new Map();
for (let i = 0; i < snapshot.nodes.length; i += width) {
  if (typeNames[snapshot.nodes[i + typeAt]] !== "object") continue;
  const name = snapshot.strings[snapshot.nodes[i + nameAt]];
  counts.set(name, (counts.get(name) ?? 0) + 1);
}

for (const name of process.argv.slice(3)) {
  console.log(`${name}: ${counts.get(name) ?? 0}`);
}
