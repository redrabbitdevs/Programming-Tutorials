import { compensatedSum } from "./compensated.mjs";

export function sum(values) {
  if (typeof Math.sumPrecise === "function") return Math.sumPrecise(values);
  return compensatedSum(values);
}
