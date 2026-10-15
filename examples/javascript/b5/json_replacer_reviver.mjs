const user = { name: "Ada", password: "secret", age: 36, role: "admin" };

console.log(JSON.stringify(user, ["name", "role"]));

console.log(
  JSON.stringify(user, (key, value) => (key === "password" ? undefined : value)),
);

const event = { title: "Launch", when: new Date(Date.UTC(2024, 5, 1, 9, 0)) };
const text = JSON.stringify(event);
console.log(text);

const revived = JSON.parse(text, (key, value) =>
  key === "when" ? new Date(value) : value,
);
console.log(revived.when instanceof Date, revived.when.getUTCFullYear());

class Money {
  constructor(cents) {
    this.cents = cents;
  }
  toJSON() {
    return `${(this.cents / 100).toFixed(2)} EUR`;
  }
}
console.log(JSON.stringify({ price: new Money(1999) }));
