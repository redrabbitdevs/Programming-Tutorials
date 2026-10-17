import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

const cases = {
  interface: "interface A { x: number }\nconst a: A = { x: 1 };\n",
  generic: "function id<T>(v: T): T { return v; }\nid<number>(1);\n",
  enum: "enum E { A }\nconsole.log(E.A);\n",
  property: "class P { constructor(public x: number) {} }\nnew P(1);\n",
  namespace: "namespace N { export const a = 1 }\nconsole.log(N.a);\n",
};

await withTempDir(async (dir) => {
  for (const [name, source] of Object.entries(cases)) {
    await writeFile(join(dir, "case.ts"), source);
    const options = { cwd: dir, encoding: "utf8" };
    const run = spawnSync(process.execPath, ["case.ts"], options);
    const code = run.stderr.match(/ERR_[A-Z_]+/)?.[0];
    console.log(`${name}: ${run.status === 0 ? "ok" : code}`);
  }
});
