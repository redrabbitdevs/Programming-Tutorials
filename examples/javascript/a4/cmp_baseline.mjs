import { features } from "web-features";

const ids = ["import-maps", "dialog", "float16array", "temporal"];
for (const id of ids) {
  const { baseline, baseline_low_date } = features[id].status;
  const status = baseline === "high" ? "widely"
    : baseline === "low" ? "newly" : "limited";
  console.log(id.padEnd(14), status, baseline_low_date ?? "");
}
