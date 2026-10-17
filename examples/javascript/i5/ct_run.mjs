import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

const tool = join(import.meta.dirname, "ct_grep.mjs");

await withTempDir(async (dir) => {
  await writeFile(join(dir, "fruit.txt"), "apple\nBanana\ncherry\napple pie\n");
  await writeFile(join(dir, "more.txt"), "pineapple\nplum\n");

  function grep(...args) {
    const options = { cwd: dir, encoding: "utf8" };
    const run = spawnSync(process.execPath, [tool, ...args], options);
    console.log(`$ grep ${args.join(" ")}  -> exit ${run.status}`);
    const lines = (text) => text.split("\n").filter(Boolean);
    for (const line of lines(run.stdout)) console.log(line);
    for (const line of lines(run.stderr)) console.log("stderr:", line);
  }

  grep("apple", "fruit.txt");
  grep("-in", "BANANA", "fruit.txt");
  grep("apple", "fruit.txt", "more.txt");
  grep("zzz", "fruit.txt");
  grep("apple", "missing.txt");
  grep("apple");
});
