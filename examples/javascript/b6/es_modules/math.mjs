export const TAX_RATE = 0.2;

export function add(a, b) {
  return a + b;
}

export function withTax(price) {
  return price * (1 + TAX_RATE);
}
