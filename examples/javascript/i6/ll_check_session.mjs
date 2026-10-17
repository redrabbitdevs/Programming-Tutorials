import { join } from "node:path";
import { session } from "./session.mjs";

session(join(import.meta.dirname, "ll_check"), [
  "node --check good.mjs; echo $?",
  "node --check bad.mjs 2>&1 | head -5",
  "node --check bad.mjs 2>/dev/null; echo $?",
]);
