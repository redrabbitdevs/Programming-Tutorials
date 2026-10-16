import { spawnSync } from "node:child_process";

const code = `
  console.log("child: start");
  Promise.reject(new Error("nobody handles me"));
  setTimeout(() => console.log("child: never printed"), 50);
`;
const child = spawnSync(process.execPath, ["-e", code], { encoding: "utf8" });

console.log("exit code:", child.status);
console.log("stdout:", child.stdout.trim());
console.log("error on stderr:", child.stderr.includes("nobody handles me"));
