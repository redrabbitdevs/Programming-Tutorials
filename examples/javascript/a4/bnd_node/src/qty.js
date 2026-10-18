export function parseQty(text) {
  const qty = Number(text);
  if (!Number.isInteger(qty)) throw new RangeError(`bad quantity: ${text}`);
  return qty;
}
