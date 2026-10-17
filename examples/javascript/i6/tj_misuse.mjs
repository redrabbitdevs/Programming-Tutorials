import { area, shortList } from "./tj_area.mjs";

console.log(area({ width: 3, height: "4" }));
console.log(area({ width: 3 }));
try {
  shortList("Ada", 2);
} catch (error) {
  console.log(String(error).split(":")[0]);
}
