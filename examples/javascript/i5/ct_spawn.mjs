import { spawn } from "node:child_process";
import { once } from "node:events";

const script = "process.stdin.pipe(process.stdout)";
const child = spawn(process.execPath, ["-e", script]);
const closed = once(child, "close");

child.stdin.end("piped in\n");
child.stdout.setEncoding("utf8");
let text = "";
for await (const chunk of child.stdout) text += chunk;

const [code, signal] = await closed;
console.log(JSON.stringify(text), code, signal);
