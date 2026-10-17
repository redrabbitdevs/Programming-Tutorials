import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export async function writeTree(root, files) {
  for (const [name, text] of Object.entries(files)) {
    const target = join(root, name);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, text);
  }
}
