abstract class Account {
  #balance = 0;

  abstract readonly kind: string;

  deposit(amount: number): void {
    this.#balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
  }

  get balance(): number {
    return this.#balance;
  }
}

class Savings extends Account {
  readonly kind = "savings";
}

const savings = new Savings();
savings.deposit(100);
savings.withdraw(30);
console.log(savings.kind, savings.balance);
try {
  savings.withdraw(500);
} catch (error) {
  console.log(String(error));
}
