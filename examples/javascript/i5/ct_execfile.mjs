import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

const ok = await run(process.execPath, ["-p", "6 * 7"]);
console.log(ok.stdout.trim(), JSON.stringify(ok.stderr));

try {
  const script = "console.log('partial'); process.exit(3)";
  await run(process.execPath, ["-e", script]);
} catch (error) {
  console.log(error.code, error.stdout.trim());
}
try {
  await run("no-such-program-xyz", []);
} catch (error) {
  console.log(error.code);
}
