export interface Item {
  name: string;
  price: number;
}

export type Cart = Item[];

export function total(cart: Cart): number {
  return cart.reduce((sum, item) => sum + item.price, 0);
}
