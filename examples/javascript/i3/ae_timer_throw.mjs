import { spawnSync } from "node:child_process";

const code = `
  try {
    setTimeout(() => { throw new Error("late"); }, 1);
  } catch {
    console.log("child: caught");
  }
  console.log("child: end of script");
`;
const child = spawnSync(process.execPath, ["-e", code], { encoding: "utf8" });

console.log("exit code:", child.status);
console.log(child.stdout.trim().split("\n"));
