// Terminal sessions from the "Writing a package" lesson, checked against real runs.
import { join } from "node:path";
import { session } from "./session.mjs";

const here = import.meta.dirname;
session(join(here, "pkg_slug"), [
  "node app.mjs",
  "node legacy.cjs",
  "npm test 2>&1 | grep -E '^ℹ (pass|fail)'",
  "npm pack --dry-run",
]);
session(join(here, "pkg_dual"), ["node hazard.mjs"]);
session(join(here, "pkg_dev"), [
  "node check.mjs",
  "node -C development check.mjs",
]);
session(join(here, "pkg_tla"), ["node use.cjs"]);
session(join(here, "pkg_slug_cli"), [
  "npm pack --dry-run 2>&1 | grep -E 'B src/|total files'",
]);
