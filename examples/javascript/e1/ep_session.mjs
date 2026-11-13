// Terminal sessions from "How V8 runs your code", checked against real runs.
// The flags and natives syntax make V8-version-specific output: the expected
// transcript is from Node 26.11.1 (V8 14.6).
import { session } from "./session.mjs";

const mask = "sed -E 's/0x[0-9a-f]+/0x…/g'";
session(import.meta.dirname, [
  "node -p process.versions.v8",
  `node --print-bytecode --print-bytecode-filter=area ep_bytecode.mjs | ${mask}`,
  "node --allow-natives-syntax --single-threaded ep_tiers.mjs",
  "node --trace-opt ep_hot.mjs | grep '^\\[marking.*score' | cut -d'>' -f2",
  "node --allow-natives-syntax --trace-deopt ep_deopt.mjs | grep -o -E '^[a-z].*|reason: [^)]*'",
  "node --allow-natives-syntax --single-threaded ep_ex_warmup.mjs",
  "node --print-bytecode --print-bytecode-filter=clamp ep_ex_clamp.mjs | grep -c Return",
  "node --allow-natives-syntax --trace-deopt ep_ex_reopt.mjs | grep -o -E '^[a-z].*|reason: [^)]*'",
]);
