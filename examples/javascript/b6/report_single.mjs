const sales = [
  { region: "north", amount: 120 },
  { region: "south", amount: 80 },
  { region: "north", amount: 50 },
];

function totalByRegion(rows) {
  const totals = {};
  for (const { region, amount } of rows) {
    totals[region] = (totals[region] ?? 0) + amount;
  }
  return totals;
}

function formatLine(region, total) {
  return `${region.padEnd(8)}${String(total).padStart(5)}`;
}

for (const [region, total] of Object.entries(totalByRegion(sales))) {
  console.log(formatLine(region, total));
}
