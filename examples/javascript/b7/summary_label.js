export function summaryLabel(count) {
  if (count === 0) return "Nothing left to do";
  if (count === 1) return "1 task left";
  return `${count} tasks left`;
}
