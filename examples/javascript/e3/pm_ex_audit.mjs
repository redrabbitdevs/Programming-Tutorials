// Run with --permission-audit to list what a script would need.
import { channel } from "node:diagnostics_channel";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

const needed = new Map();
function record({ permission, resource }) {
  needed.set(permission, (needed.get(permission) ?? new Set()).add(resource));
}
for (const scope of ["fs", "net", "child", "worker"]) {
  channel(`node:permission-model:${scope}`).subscribe(record);
}

// The work being audited.
readFileSync("pm_data/sales.csv");
writeFileSync("pm_out/audit.txt", "checked\n");
execFileSync("true");
rmSync("pm_out/audit.txt");

for (const [permission, resources] of needed) {
  console.log(permission, [...resources]);
}
