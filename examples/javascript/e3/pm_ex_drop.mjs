import { readFileSync } from "node:fs";

// Read configuration while the grant is still there...
const config = readFileSync("pm_data/sales.csv", "utf8");
console.log("rows at startup:", config.trim().split("\n").length - 1);

// ...then give it up for the rest of the process.
process.permission.drop("fs.read", "pm_data");
console.log("may read pm_data now:", process.permission.has("fs.read", "pm_data"));

try {
  readFileSync("pm_data/sales.csv");
} catch (error) {
  console.log("second read:", error.code);
}
