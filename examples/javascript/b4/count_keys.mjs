function countKeys(record) {
  let total = 0;
  for (const key of Object.keys(record)) {
    total += 1;
    const value = record[key];
    if (typeof value === "object" && value !== null) {
      total += countKeys(value);
    }
  }
  return total;
}

console.log(countKeys({}));
console.log(countKeys({ a: 1, b: 2 }));
console.log(countKeys({ a: 1, b: { c: 2, d: { e: 3 } } }));
