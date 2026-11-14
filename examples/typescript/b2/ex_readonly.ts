const account: { readonly id: number; balance: number } = {
  id: 7,
  balance: 100,
};

account.balance += 50;
// @ts-expect-error: id is readonly
account.id = 8;
console.log(account);
