export const sales = [
  { region: "north", amount: 120 },
  { region: "south", amount: 80 },
  { region: "north", amount: 50 },
];

export function totalByRegion(rows) {
  const totals = {};
  for (const { region, amount } of rows) {
    totals[region] = (totals[region] ?? 0) + amount;
  }
  return totals;
}
