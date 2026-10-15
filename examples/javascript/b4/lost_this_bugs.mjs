const counter = {
  count: 0,
  step: 2,
  increment() {
    this.count += this.step;
    return this.count;
  },
};

function attempt(label, fn) {
  try {
    console.log(label, fn());
  } catch (error) {
    console.log(label, `${error.name}`);
  }
}

// Bug 1: method copied into a variable.
const inc = counter.increment;
attempt("bug 1:", () => inc());

// Bug 2: method passed as a callback.
function twice(fn) {
  return [fn(), fn()];
}
attempt("bug 2:", () => twice(counter.increment));

// Bug 3: regular function inside a method.
const report = {
  prefix: "item",
  list(items) {
    return items.map(function (item) {
      return `${this.prefix} ${item}`;
    });
  },
};
attempt("bug 3:", () => report.list(["a", "b"]));

// Bug 4: arrow function as a method.
const logger = {
  name: "logger",
  describe: () => `I am ${this.name}`,
};
attempt("bug 4:", () => logger.describe());

// Bug 5: method called through another object's property.
const wrapper = { run: counter.increment };
attempt("bug 5:", () => wrapper.run());
