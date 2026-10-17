import { mkdir, writeFile, readdir, rename } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  await mkdir(join(dir, "pics"));
  await writeFile(join(dir, "todo.txt"), "buy milk");
  await rename(join(dir, "todo.txt"), join(dir, "done.txt"));

  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    console.log(entry.name, entry.isDirectory() ? "folder" : "file");
  }
});
