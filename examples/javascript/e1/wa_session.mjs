// Terminal sessions from "WebAssembly from JavaScript", checked against real
// runs on Node 26.11.1. Importing .wasm files prints an ExperimentalWarning
// with the process id on standard error, so warnings are turned off here.
import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node wa_instantiate.mjs",
  "node wa_memory.mjs",
  "node wa_import.mjs",
  "node wa_ex_upper.mjs",
  "node wa_ex_grow.mjs",
  "node wa_ex_source.mjs",
], { NODE_NO_WARNINGS: "1" });
