import { mkdtempDisposable, open, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

async function writeText(path, text) {
  await using file = await open(path, "w");
  await file.write(text);
}

let workspace;
{
  await using dir = await mkdtempDisposable(join(tmpdir(), "ws-"));
  workspace = dir.path;
  await writeText(join(dir.path, "b.txt"), "second\n");
  await writeText(join(dir.path, "a.txt"), "first\n");
  console.log((await readdir(dir.path)).sort());
}
console.log("exists after:", existsSync(workspace));
