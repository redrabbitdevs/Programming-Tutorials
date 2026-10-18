import { formatPrice } from "#format";

export function cartSummary(items) {
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.cents * item.qty, 0);
  return `${count} items, ${formatPrice(total)}`;
}
