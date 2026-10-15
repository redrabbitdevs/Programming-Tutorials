function createAccount(opening) {
  let balance = opening;
  const history = [];

  return {
    deposit(amount) {
      balance += amount;
      history.push(`+${amount}`);
    },
    withdraw(amount) {
      if (amount > balance) {
        throw new RangeError("insufficient funds");
      }
      balance -= amount;
      history.push(`-${amount}`);
    },
    getBalance() {
      return balance;
    },
    getHistory() {
      return [...history];
    },
  };
}

const account = createAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.getBalance(), account.getHistory());
console.log(account.balance, account.history);

try {
  account.withdraw(1000);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
