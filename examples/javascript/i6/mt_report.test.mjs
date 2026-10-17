import { it } from "node:test";
import { renderReport } from "./mt_report.mjs";

const orders = [
  { id: "a1", total: 120 },
  { id: "b22", total: 5 },
];

it("renders the report", (t) => {
  t.assert.snapshot(renderReport(orders));
});

it("renders an empty report", (t) => {
  t.assert.snapshot(renderReport([]));
});
