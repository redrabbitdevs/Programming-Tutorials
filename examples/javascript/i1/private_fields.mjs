class Wallet {
  #cents;

  constructor(cents = 0) {
    this.#cents = cents;
  }

  get balance() {
    return this.#cents / 100;
  }

  deposit(cents) {
    this.#cents += cents;
    return this;
  }
}

const wallet = new Wallet(250).deposit(50);
console.log(wallet.balance, wallet.cents, wallet["#cents"]);
console.log(Object.keys(wallet), JSON.stringify(wallet));
console.log(wallet);
