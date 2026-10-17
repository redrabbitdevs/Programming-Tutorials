import { spawnSync } from "node:child_process";
import { join } from "node:path";

function run(name) {
  const file = join(import.meta.dirname, name);
  const result = spawnSync(process.execPath, [file], { encoding: "utf8" });
  const lines = result.stderr.split("\n");
  const problem = lines.find((line) => /^\w*Error/.test(line));
  const shown = problem ?? result.stdout.trim();
  console.log(`${name}: exit ${result.status}`, shown);
}

run("tj_enum.ts");
run("tj_badimport.ts");
run("tj_wrongtype.ts");
