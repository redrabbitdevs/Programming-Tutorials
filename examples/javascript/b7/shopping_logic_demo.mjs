import { describeItem, isLow, sortByName } from "./shopping_logic.js";

const items = [
  { name: "pears", qty: 4 },
  { name: "apples", qty: 1 },
  { name: "milk", qty: 2 },
];

for (const item of sortByName(items)) {
  console.log(describeItem(item), isLow(item));
}
console.log(items[0].name);
