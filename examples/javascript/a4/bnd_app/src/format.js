export function formatPrice(cents, currency = "EUR") {
  const fmt = new Intl.NumberFormat("en-GB", { style: "currency", currency });
  return fmt.format(cents / 100);
}

export function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
