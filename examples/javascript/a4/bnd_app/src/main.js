import { cartSummary } from "./cart.js";

const items = [
  { name: "Tea", cents: 450, qty: 2 },
  { name: "Cake", cents: 325, qty: 1 },
];
document.querySelector("#summary").textContent = cartSummary(items);
