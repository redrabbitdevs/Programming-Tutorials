import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const node = process.execPath;

async function report(label, args, options) {
  try {
    await run(node, args, options);
    console.log(label, "-> exit code 0");
  } catch (error) {
    const { code, signal, killed } = error;
    console.log(label, "->", { code, signal, killed });
  }
}

await report("exits with 3", ["-e", "process.exit(3)"]);
await report("runs forever", ["-e", "setInterval(() => {}, 1000)"],
  { timeout: 200 });
