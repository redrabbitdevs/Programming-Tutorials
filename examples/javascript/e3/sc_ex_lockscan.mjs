import { readFileSync } from "node:fs";

const REGISTRY = "https://registry.npmjs.org/";
const file = process.argv[2] ?? "sc_ex_lock.json";
const lock = JSON.parse(readFileSync(file, "utf8"));

// Everything a reviewer should look at in a lockfile (version 2 or 3).
function review(packages) {
  const findings = [];
  for (const [path, entry] of Object.entries(packages)) {
    if (path === "") continue; // the project itself
    const name = path.slice(path.lastIndexOf("node_modules/") + 13);
    const where = `${name}@${entry.version}${entry.dev ? " (dev)" : ""}`;
    if (entry.hasInstallScript) findings.push(`${where}: install script`);
    if (!entry.resolved?.startsWith(REGISTRY)) {
      findings.push(`${where}: not from the registry: ${entry.resolved}`);
    }
    if (!entry.integrity) findings.push(`${where}: no integrity hash`);
  }
  return findings;
}

const findings = review(lock.packages);
for (const finding of findings) console.log(finding);
console.log(`${findings.length} findings`);
