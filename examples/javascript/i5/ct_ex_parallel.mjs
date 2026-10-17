import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const node = process.execPath;

const results = await Promise.allSettled([
  run(node, ["-p", "1 + 1"]),
  run(node, ["-e", "process.exit(3)"]),
  run("no-such-program-xyz", []),
]);

for (const result of results) {
  if (result.status === "fulfilled") {
    console.log("ok:", result.value.stdout.trim());
  } else {
    const code = result.reason.code;
    const text = typeof code === "number" ? `exit ${code}` : code;
    console.log(`failed (${text})`);
  }
}
