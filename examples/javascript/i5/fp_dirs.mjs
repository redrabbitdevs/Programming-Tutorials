import { mkdir, writeFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  await mkdir(join(dir, "docs", "old"), { recursive: true });
  await writeFile(join(dir, "docs", "a.txt"), "hello");
  await writeFile(join(dir, "docs", "old", "b.txt"), "hi");

  console.log((await readdir(join(dir, "docs"))).sort());
  console.log((await readdir(dir, { recursive: true })).sort());

  const info = await stat(join(dir, "docs", "a.txt"));
  console.log(info.size, info.isFile(), info.isDirectory());
});
