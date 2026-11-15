import { Cart, Item, total } from "./inventory.ts";

const tea: Item = { name: "tea", price: 3 };
const cart: Cart = [tea, { name: "cake", price: 4 }];
console.log(total(cart));
