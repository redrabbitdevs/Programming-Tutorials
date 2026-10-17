import { spawnSync } from "node:child_process";

const programs = {
  "falls off the end": "console.log('done')",
  "sets exitCode": "process.exitCode = 5",
  "calls process.exit": "process.exit(4); console.log('never')",
  "throws": "throw new Error('boom')",
  "rejects": "Promise.reject(new Error('late'))",
};
for (const [name, code] of Object.entries(programs)) {
  const args = ["-e", code];
  const { status } = spawnSync(process.execPath, args, { encoding: "utf8" });
  console.log(`${status}  ${name}`);
}
