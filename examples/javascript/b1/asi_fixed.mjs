// Prints the total price including tax, for two quantities.
const priceTag = 20;
const tax = 5;
const total = priceTag + tax;

[1, 2].forEach((n) => console.log(n * total));

function label() {
  return "Total: " + total;
}

console.log(label());
