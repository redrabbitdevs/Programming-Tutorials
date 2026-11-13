import * as rules from "./rules.mjs";

const text = process.argv[2] ?? "w7 and w19999";
const hits = Object.values(rules)
  .filter((rule) => typeof rule === "function")
  .map((rule) => rule(text))
  .filter((n) => n >= 0);
console.log(`checked ${rules.count} rules, matched: ${hits.join(", ")}`);
