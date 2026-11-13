// Terminal sessions from "Profiling Node.js", checked against real runs on
// Node 26.11.1. Profile file names contain the date and process id, so the
// commands use a glob. Shares of time vary, so pr_top.mjs prints only the
// functions above 10%.
import { session } from "./session.mjs";

session(import.meta.dirname, [
  "node --cpu-prof --cpu-prof-dir=prof pr_slow.mjs",
  "node pr_top.mjs prof/*.cpuprofile",
  "node pr_ex_total.mjs prof/*.cpuprofile handleOrdersRequest",
  "node pr_ex_total.mjs prof/*.cpuprofile findUser",
  "rm -r prof",
  "node pr_ex_fixed.mjs",
]);
