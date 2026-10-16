const source = {
  first: "Ada",
  last: "Lovelace",
  get full() {
    return `${this.first} ${this.last}`;
  },
};

const assigned = Object.assign({}, source);
const cloned = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(source),
);

assigned.first = "Grace";
cloned.first = "Grace";
console.log(assigned.full, "|", cloned.full);
console.log(Object.getOwnPropertyDescriptor(assigned, "full").value);
console.log(typeof Object.getOwnPropertyDescriptor(cloned, "full").get);
