const user = {
  name: "Ada",
  greet() {
    return `Hello, I am ${this.name}`;
  },
};

function runLater(callback) {
  return callback();
}

console.log(runLater(user.greet.bind(user)));
console.log(runLater(() => user.greet()));

const bound = user.greet.bind({ name: "Grace" });
console.log(bound());
console.log(bound.call({ name: "ignored" }));
