import { nextCount } from "./counter_logic.js";

let count = 0;
for (const action of ["inc", "inc", "dec", "inc", "oops"]) {
  count = nextCount(count, action);
  console.log(action, count);
}
console.log("reset", nextCount(count, "reset"));
console.log("step 5", nextCount(count, "inc", 5));
