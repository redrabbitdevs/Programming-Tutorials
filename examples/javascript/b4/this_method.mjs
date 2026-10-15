const user = {
  name: "Ada",
  greet() {
    return `Hello, I am ${this.name}`;
  },
};

console.log(user.greet());

const other = { name: "Grace", greet: user.greet };
console.log(other.greet());

function whoAmI() {
  return this;
}
console.log(whoAmI());
console.log(user.greet.call({ name: "Linus" }));
