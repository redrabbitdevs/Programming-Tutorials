// Terminal sessions from "Hidden classes and inline caches", checked against
// real runs. Expected transcript: Node 26.11.1 (V8 14.6).
import { session } from "./session.mjs";

const ic = "node --log-ic --logfile=ic.log --no-logfile-per-isolate " +
  "--no-lazy-feedback-allocation";
session(import.meta.dirname, [
  "node --allow-natives-syntax sh_maps.mjs",
  "node --allow-natives-syntax sh_build.mjs",
  "node --allow-natives-syntax sh_delete.mjs",
  `${ic} sh_ic.mjs`,
  "grep '^LoadIC' ic.log | cut -d, -f4-7,9 | grep '^2,16,'",
  "rm ic.log",
  "node --allow-natives-syntax --trace-deopt sh_deopt.mjs | grep -o -E '^[a-z].*|reason: [^)]*'",
  "node --allow-natives-syntax sh_ex_optional.mjs",
  "node --allow-natives-syntax sh_ex_elements.mjs",
  `${ic} sh_ex_mono.mjs`,
  "grep '^LoadIC' ic.log | cut -d, -f4-7,9 | grep -E '^(11,42|14,16),'",
  "rm ic.log",
]);
