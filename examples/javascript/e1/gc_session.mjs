// Terminal sessions from "Garbage collection in V8", checked against real
// runs. Collection counts and timings vary by machine, so the commands keep
// only the kinds of collection. Expected transcript: Node 26.11.1 (V8 14.6).
import { session } from "./session.mjs";

const kinds = "grep -o -E 'Scavenge|Mark-Compact' | sort -u";
session(import.meta.dirname, [
  `node --trace-gc gc_churn.mjs | ${kinds}`,
  `node --trace-gc gc_grow.mjs | ${kinds}`,
  "node --max-old-space-size=32 gc_grow.mjs > oom.log 2>&1",
  "echo $?",
  "grep -o 'JavaScript heap out of memory' oom.log",
  "rm oom.log",
  "node --max-old-space-size=64 gc_spaces.mjs",
  "node --expose-gc gc_weakref.mjs",
  "node gc_ex_reuse.mjs",
  "node gc_ex_limit.mjs",
  "node --expose-gc gc_ex_registry.mjs",
]);
