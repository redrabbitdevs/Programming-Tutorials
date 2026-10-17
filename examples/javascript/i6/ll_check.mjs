import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

const sources = {
  "good.mjs": "const total = [1, 2, 3].reduce((a, b) => a + b, 0);\n",
  "bad.mjs": "const total = (1 + ;\n",
};

await withTempDir(async (dir) => {
  for (const [name, text] of Object.entries(sources)) {
    await writeFile(join(dir, name), text);
    const options = { cwd: dir, encoding: "utf8" };
    const run = spawnSync(process.execPath, ["--check", name], options);
    const lines = run.stderr.split("\n");
    const problem = lines.find((line) => line.startsWith("SyntaxError"));
    console.log(name, "exit", run.status, problem ?? "no problem");
  }
});
