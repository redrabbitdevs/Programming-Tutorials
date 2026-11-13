import { spawnSync } from "node:child_process";

function limitWith(megabytes) {
  const script = "console.log(v8.getHeapStatistics().heap_size_limit)";
  const flags = [`--max-old-space-size=${megabytes}`, "-e", script];
  const child = spawnSync(process.execPath, flags, { encoding: "utf8" });
  return Number(child.stdout) / 2 ** 20;
}

const small = limitWith(64);
const large = limitWith(256);
console.log("limit grows by", large - small, "MB");
console.log("rest of the limit:", small - 64, "MB in both");
