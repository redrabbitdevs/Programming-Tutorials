class Wallet {
  #cents = 0;

  static isWallet(value) {
    return #cents in value;
  }

  deposit(cents) {
    this.#cents += cents;
    return this;
  }
}

console.log(Wallet.isWallet(new Wallet()), Wallet.isWallet({ cents: 0 }));

try {
  new Wallet().deposit.call({}, 5);
} catch (error) {
  console.log(error.name);
}
