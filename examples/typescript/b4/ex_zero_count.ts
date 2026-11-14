function describeStock(stock: number | undefined): string {
  if (stock === undefined) {
    return "unknown";
  }
  return stock === 0 ? "sold out" : `${stock} left`;
}

console.log(describeStock(4));
console.log(describeStock(0));
console.log(describeStock(undefined));
