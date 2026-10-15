const counter = {
  count: 0,
  increment() {
    this.count += 1;
    return this;
  },
  describe: function () {
    return `count is ${this.count}`;
  },
};

counter.increment().increment();
console.log(counter.describe());

const config = { server: { port: 8080 } };
console.log(config.server.port);
console.log(config.database?.host);
console.log(config.database?.host ?? "localhost");

const original = { a: 1 };
const alias = original;
alias.a = 2;
console.log(original.a, original === alias, { a: 2 } === { a: 2 });
