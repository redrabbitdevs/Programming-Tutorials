import { rmSync } from "node:fs";
import { join } from "node:path";
import { session } from "./session.mjs";

session(import.meta.dirname, [
  "printf 'hello\\nnode world\\n' | node ct_stdin.mjs",
  "printf 'hello\\nnode world\\n' | node ct_stdin.mjs > upper.txt",
  "cat upper.txt",
]);
rmSync(join(import.meta.dirname, "upper.txt"));
