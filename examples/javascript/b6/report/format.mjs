export function formatLine(region, total) {
  return `${region.padEnd(8)}${String(total).padStart(5)}`;
}
