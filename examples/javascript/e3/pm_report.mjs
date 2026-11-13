import { readFileSync, writeFileSync } from "node:fs";

// Sum the amount column of a CSV file by region.
const text = readFileSync("pm_data/sales.csv", "utf8");
const [, ...rows] = text.trim().split("\n");
const totals = new Map();
for (const row of rows) {
  const [region, amount] = row.split(",");
  totals.set(region, (totals.get(region) ?? 0) + Number(amount));
}

const lines = [...totals].map(([region, total]) => `${region}: ${total}`);
writeFileSync("pm_out/summary.txt", lines.join("\n") + "\n");
console.log("wrote pm_out/summary.txt");
console.log("may read session.mjs:",
  process.permission?.has("fs.read", "session.mjs") ?? "no model");
