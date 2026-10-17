import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

const scripts = {
  hello: `node -e "console.log('hello from a script')"`,
  show: `node -p "process.argv.slice(1).join(' ')"`,
};

await withTempDir(async (dir) => {
  const pkg = JSON.stringify({ name: "demo", scripts });
  await writeFile(join(dir, "package.json"), pkg);

  const options = { cwd: dir, encoding: "utf8" };
  const run = (...args) =>
    execFileSync(process.execPath, ["--run", ...args], options).trim();

  console.log(run("hello"));
  console.log(run("show", "--", "one", "two"));
});
