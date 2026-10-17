import { spawnSync } from "node:child_process";

const script = "console.log('out'); console.error('err'); process.exitCode = 2";
const args = ["-e", script];
const result = spawnSync(process.execPath, args, { encoding: "utf8" });

console.log(result.status, result.signal);
console.log(JSON.stringify(result.stdout), JSON.stringify(result.stderr));
