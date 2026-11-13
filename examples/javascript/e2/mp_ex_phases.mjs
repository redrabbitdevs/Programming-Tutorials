import { performance } from "node:perf_hooks";

performance.mark("start");
const text = JSON.stringify(Array.from({ length: 50_000 }, (_, i) => ({
  id: i, price: (i % 100) + 0.99,
})));
performance.mark("loaded");
const rows = JSON.parse(text);
performance.mark("parsed");
const total = rows.reduce((sum, row) => sum + row.price, 0);
performance.mark("summed");

const phases = [
  performance.measure("load", "start", "loaded"),
  performance.measure("parse", "loaded", "parsed"),
  performance.measure("sum", "parsed", "summed"),
];
const all = performance.measure("total", "start", "summed");

const parts = phases.reduce((sum, m) => sum + m.duration, 0);
const gap = Math.abs(parts - all.duration);
console.log("phases:", phases.map((m) => m.name).join(", "));
console.log("phases add up to the total:", gap < 1e-6);
console.log("total price:", Math.round(total));
