function line(name, quantity, price) {
  const total = (quantity * price).toFixed(2);
  return `${name.padEnd(8)}${String(quantity).padStart(3)}${total.padStart(8)}`;
}

console.log(line("Tea", 2, 3.5));
console.log(line("Cake", 1, 4.25));
console.log(line("Biscuit", 12, 0.4));
