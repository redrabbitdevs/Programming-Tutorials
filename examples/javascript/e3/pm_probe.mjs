import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { execFileSync } from "node:child_process";

// Run `action`, and report whether the permission model allowed it.
function attempt(label, action) {
  try {
    action();
    console.log(`allowed  ${label}`);
  } catch (error) {
    if (error.code !== "ERR_ACCESS_DENIED") throw error;
    console.log(`denied   ${label} (${error.permission})`);
  }
}

console.log("permission model:", process.permission ? "on" : "off");
attempt("read pm_data/sales.csv", () => readFileSync("pm_data/sales.csv"));
attempt("read session.mjs", () => readFileSync("session.mjs"));
attempt("write pm_out/probe.txt", () => writeFileSync("pm_out/probe.txt", ""));
attempt("listen on a port", () => createServer().listen(0).close());
attempt("run a program", () => execFileSync("true"));
