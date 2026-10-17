import { spawnSync } from "node:child_process";

// Runs the coverage command from the lesson and prints the rows that matter,
// with the column padding squeezed so that the output is the same on every Node.
const args = ["--test", "--experimental-test-coverage", "--test-reporter=spec", "pr_client.test.mjs"];
const run = spawnSync(process.execPath, args, { cwd: import.meta.dirname, encoding: "utf8" });
const rows = run.stdout
  .split("\n")
  .filter((line) => /^ℹ (file|pr_client\.mjs|pr_server\.mjs)/.test(line))
  .map((line) => line.slice(2).replace(/\s+/g, " ").trim());
console.log(rows.join("\n"));
