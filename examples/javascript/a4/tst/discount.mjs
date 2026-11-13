export function discount(total) {
  if (total < 50) return 0;
  if (total < 100) return 5;
  return 10;
}
