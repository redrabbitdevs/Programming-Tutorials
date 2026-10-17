import { it } from "node:test";
import { toCsv } from "./mt_ex_csv.mjs";

it("quotes cells that need it", (t) => {
  const rows = [
    ["name", "note"],
    ["Ada", 'likes "math", logic'],
    ["Alan", "plain"],
  ];
  t.assert.snapshot(toCsv(rows));
});
