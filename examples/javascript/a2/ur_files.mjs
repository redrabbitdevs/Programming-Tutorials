import { mkdtempDisposable, open, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let dirPath;
{
  await using dir = await mkdtempDisposable(join(tmpdir(), "ur-"));
  dirPath = dir.path;
  const notes = join(dir.path, "notes.txt");
  {
    await using file = await open(notes, "w");
    await file.write("written through a FileHandle\n");
  }
  process.stdout.write(await readFile(notes, "utf8"));
  console.log("exists inside:", existsSync(dirPath));
}
console.log("exists after:", existsSync(dirPath));
