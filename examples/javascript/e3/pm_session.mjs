// Terminal sessions from "Sandboxing Node with the permission model".
// Expected transcript: Node 26.11.1.
import { session } from "./session.mjs";

const grants = "--allow-fs-read=pm_data --allow-fs-write=pm_out";

session(import.meta.dirname, [
  "node pm_probe.mjs",
  "node --permission pm_probe.mjs",
  `node --permission ${grants} pm_probe.mjs`,
  `node --permission ${grants} --allow-net pm_probe.mjs`,
  `node --permission ${grants} pm_report.mjs`,
  "cat pm_out/summary.txt",
  "node --permission --allow-fs-read=pm_data pm_report.mjs",
  "rm pm_out/probe.txt pm_out/summary.txt",
  // Exercises
  "node pm_ex_lock.mjs 'buy milk'",
  "rm -r pm_notes",
  "node --permission --allow-fs-read='pm_notes/*' --allow-fs-write='pm_notes/*' pm_ex_lock.mjs 'call Ada'",
  "rm -r pm_notes",
  "node --permission-audit pm_ex_audit.mjs",
  "node --permission --allow-fs-read=pm_data pm_ex_drop.mjs",
]);
