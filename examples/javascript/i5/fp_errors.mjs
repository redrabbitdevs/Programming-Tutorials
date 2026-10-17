import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { withTempDir } from "./fp_helper.mjs";

await withTempDir(async (dir) => {
  const missing = join(dir, "missing.txt");
  try {
    await readFile(missing, "utf8");
  } catch (error) {
    console.log(error.code, error.syscall);
    console.log(error.message.replace(dir, "<dir>"));
  }

  const file = join(dir, "once.txt");
  await writeFile(file, "x", { flag: "wx" });
  await writeFile(file, "y", { flag: "wx" }).catch((e) => console.log(e.code));
});
