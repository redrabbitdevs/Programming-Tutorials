import { closeSync, openSync, readFileSync, writeSync } from "node:fs";
import { mkdtempDisposable } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

await using dir = await mkdtempDisposable(join(tmpdir(), "ur-"));
const path = join(dir.path, "log.txt");
{
  using stack = new DisposableStack();
  const fd = stack.adopt(openSync(path, "w"), (fd) => {
    closeSync(fd);
    console.log("closed descriptor");
  });
  writeSync(fd, "hello from a raw descriptor\n");
}
process.stdout.write(readFileSync(path, "utf8"));
