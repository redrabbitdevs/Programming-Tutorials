const user = {
  name: "Ada",
  get label() {
    return `user ${this.name}`;
  },
};

console.log(Object.getOwnPropertyDescriptor(user, "name"));
console.log(Object.getOwnPropertyDescriptor(user, "label"));
console.log(Object.getOwnPropertyDescriptor([1, 2], "length"));

class Point {
  norm() {}
}
console.log(Object.getOwnPropertyDescriptor(Point.prototype, "norm"));
