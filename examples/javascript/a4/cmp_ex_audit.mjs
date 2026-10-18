import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const rules = [
  { name: "Float16Array", node: 24, test: (l) => l.includes("Float16Array") },
  { name: "Promise.try", node: 24, test: (l) => l.includes("Promise.try") },
  { name: ".toHex(", node: 26, test: (l) => l.includes(".toHex(") },
  { name: ".toBase64(", node: 26, test: (l) => l.includes(".toBase64(") },
  { name: "Uint8Array.fromBase64", node: 26,
    test: (l) => l.includes("Uint8Array.fromBase64") },
  { name: "Iterator.concat", node: 26, test: (l) => l.includes("Iterator.concat") },
  { name: "using", node: 24, test: (l) => /^\s*using\s/.test(l) },
];

async function audit(dir, target) {
  const findings = [];
  const names = (await readdir(dir)).filter((n) => /\.m?js$/.test(n)).sort();
  for (const name of names) {
    const lines = (await readFile(join(dir, name), "utf8")).split("\n");
    lines.forEach((line, i) => {
      for (const rule of rules) {
        if (rule.node > target && rule.test(line)) {
          findings.push(`${name}:${i + 1} ${rule.name} needs Node ${rule.node}`);
        }
      }
    });
  }
  return findings;
}

const dir = join(import.meta.dirname, "cmp_audit_src");
for (const target of [22, 24]) {
  console.log(`target Node ${target}:`);
  for (const finding of await audit(dir, target)) console.log(" ", finding);
}
