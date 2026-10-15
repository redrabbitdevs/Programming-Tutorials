import { validateAge } from "./age_rule.js";

for (const text of ["", "abc", "12.5", "12", "13", " 40 ", "121"]) {
  console.log(JSON.stringify(text), "->", JSON.stringify(validateAge(text)));
}
