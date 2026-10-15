export function describeItem({ name, qty }) {
  return `${qty} x ${name}`;
}

export function sortByName(items) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

export function isLow(item) {
  return item.qty <= 1;
}
