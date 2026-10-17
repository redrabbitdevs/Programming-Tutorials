export function renderReport(orders) {
  const row = (o) => `${o.id.padEnd(4)} ${String(o.total).padStart(6)}`;
  const lines = orders.map(row);
  const sum = orders.reduce((total, o) => total + o.total, 0);
  return ["ID    TOTAL", ...lines, `SUM ${String(sum).padStart(7)}`].join("\n");
}
