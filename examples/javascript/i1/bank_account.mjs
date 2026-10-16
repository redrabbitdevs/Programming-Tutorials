class Account {
  constructor(owner) {
    this.owner = owner;
    this.balance = 0;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new RangeError("deposit must be positive");
    }
    this.balance += amount;
    return this;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new RangeError("insufficient funds");
    }
    this.balance -= amount;
    return this;
  }

  get summary() {
    return `${this.owner}: ${this.balance}`;
  }
}

const account = new Account("Ada").deposit(100).withdraw(30);
console.log(account.summary);

for (const action of [() => account.withdraw(500), () => account.deposit(0)]) {
  try {
    action();
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
}
console.log(account.balance);
