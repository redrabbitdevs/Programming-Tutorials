import { cartSummary } from "./src/cart.js";

const items = [
  { name: "Tea", cents: 450, qty: 2 },
  { name: "Cake", cents: 325, qty: 1 },
];
console.log(cartSummary(items));
