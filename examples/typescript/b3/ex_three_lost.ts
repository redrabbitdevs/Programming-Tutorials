class Account {
  balance = 100;
  deposit(this: Account, amount: number) {
    this.balance += amount;
  }
  withdraw(this: Account, amount: number) {
    this.balance -= amount;
  }
  report(this: Account) {
    return `balance ${this.balance}`;
  }
}

const account = new Account();
const deposit = account.deposit.bind(account);
const withdraw = account.withdraw.bind(account);
const report = account.report.bind(account);
deposit(50);
withdraw(30);
console.log(report());
