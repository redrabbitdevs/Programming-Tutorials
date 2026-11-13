// Writes cli/rules.mjs: 20,000 small exported functions, a stand-in for the
// large dependency tree a real command-line tool loads at start-up.
import { mkdirSync, writeFileSync } from "node:fs";

const lines = [];
for (let i = 0; i < 20_000; i++) {
  lines.push(`export function rule${i}(text) {`,
    `  return text.includes("w${i}") ? ${i} : -1;`, "}");
}
lines.push("export const count = 20000;");
mkdirSync("cli", { recursive: true });
writeFileSync("cli/rules.mjs", lines.join("\n") + "\n");
console.log("wrote cli/rules.mjs with 20000 functions");
