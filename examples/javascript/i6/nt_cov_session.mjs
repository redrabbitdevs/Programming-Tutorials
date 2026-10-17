// Validator helper, not shown in the lesson: runs the coverage command and
// prints its coverage table, which is the part the lesson shows.
import { spawnSync } from "node:child_process";

const args = ["--test", "--experimental-test-coverage", "nt_grade.test.mjs"];
console.log("$ node " + args.join(" "));
const run = spawnSync(process.execPath, args, {
  cwd: import.meta.dirname,
  encoding: "utf8",
});
const lines = run.stdout.split("\n");
const start = lines.findIndex((line) => line.includes("start of coverage"));
const end = lines.findIndex((line) => line.includes("end of coverage"));
console.log(lines.slice(start, end + 1).join("\n"));
