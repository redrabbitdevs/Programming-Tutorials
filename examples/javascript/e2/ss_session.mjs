// Terminal sessions from "Startup: compile cache and snapshots", checked
// against real runs on Node 26.11.1. Timings are not compared. The cache
// folder's name includes the user id, so the transcript counts files instead.
import { join } from "node:path";
import { session } from "./session.mjs";

const here = import.meta.dirname;
session(here, [
  "node ss_make.mjs",
  "node cli/lint.mjs",
  "NODE_COMPILE_CACHE=.cache node cli/lint.mjs",
  "find .cache -type f | wc -l",
  "rm -r .cache",
  "node ss_index.cjs 1000",
  "node --snapshot-blob snap.blob --build-snapshot ss_index.cjs",
  "node --snapshot-blob snap.blob 1000",
  "node --snapshot-blob snap.blob 5",
  "rm snap.blob",
  "node ss_ex_enable.mjs",
  "rm -r .cache cli/rules.mjs",
  "node --snapshot-blob greet.blob --build-snapshot ss_ex_greet.cjs",
  "node --snapshot-blob greet.blob Ada",
  "GREETING_LANG=fr node --snapshot-blob greet.blob Ada",
  "rm greet.blob",
]);
session(join(here, "sea"), [
  "node --build-sea sea-config.json > /dev/null",
  "./hello Ada",
  "rm hello",
]);
