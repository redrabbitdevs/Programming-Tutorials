class Account {
  readonly owner: string;
  #balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.#balance = balance;
  }

  get balance(): number {
    return this.#balance;
  }
}

const account = new Account("Ada", 100);
console.log(account.owner, account.balance);
