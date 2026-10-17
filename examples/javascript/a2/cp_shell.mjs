import { exec, execFile } from "node:child_process";
import { promisify } from "node:util";

const runInShell = promisify(exec);
const runFile = promisify(execFile);

const fileName = "notes.txt; echo INJECTED";

const viaShell = await runInShell(`echo ${fileName}`);
console.log("exec:    ", JSON.stringify(viaShell.stdout));

const direct = await runFile("echo", [fileName]);
console.log("execFile:", JSON.stringify(direct.stdout));
