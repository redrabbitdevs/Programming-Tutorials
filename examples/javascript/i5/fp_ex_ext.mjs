import { writeFile, readdir } from "node:fs/promises";
import { join, extname } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  for (const name of ["a.txt", "b.md", "c.txt", "d.js"]) {
    await writeFile(join(dir, name), "");
  }
  const counts = new Map();
  for (const name of await readdir(dir)) {
    const ext = extname(name);
    counts.set(ext, (counts.get(ext) ?? 0) + 1);
  }
  for (const ext of [...counts.keys()].sort()) {
    console.log(`${ext}: ${counts.get(ext)}`);
  }
});
