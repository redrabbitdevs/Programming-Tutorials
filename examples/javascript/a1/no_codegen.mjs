import { spawnSync } from "node:child_process";

const script = `
  try { eval("1 + 1"); } catch (e) { console.log("eval:", e.name); }
  try { new Function("return 1"); } catch (e) {
    console.log("Function:", e.name);
  }
  console.log("JSON still works:", JSON.parse("[1]").length);
`;
const flags = ["--disallow-code-generation-from-strings", "-e", script];
const child = spawnSync(process.execPath, flags, { encoding: "utf8" });
console.log(child.stdout.trim());
