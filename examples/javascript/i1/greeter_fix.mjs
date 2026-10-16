class Greeter {
  constructor(name) {
    this.name = name;
  }

  greet = () => `Hello, ${this.name}`;
}

function callTwice(fn) {
  return [fn(), fn()];
}

const ada = new Greeter("Ada");
console.log(callTwice(ada.greet));

const { greet } = new Greeter("Grace");
console.log(greet());
