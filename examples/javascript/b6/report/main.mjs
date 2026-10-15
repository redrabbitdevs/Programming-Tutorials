import { sales, totalByRegion } from "./data.mjs";
import { formatLine } from "./format.mjs";

for (const [region, total] of Object.entries(totalByRegion(sales))) {
  console.log(formatLine(region, total));
}
