class Money {
  constructor(cents) {
    this.cents = cents;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return `$${(this.cents / 100).toFixed(2)}`;
    }
    return this.cents / 100;
  }
}

const price = new Money(1250);
const tip = new Money(300);
console.log(`${price}`, price + tip, price > tip);
console.log(`Total: ${new Money(Math.round(price * 100 + tip * 100))}`);
