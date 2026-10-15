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

// Fix 1: call it on the object.
attempt("bug 1:", () => counter.increment());

// Fix 2: bind the method.
function twice(fn) {
  return [fn(), fn()];
}
attempt("bug 2:", () => twice(counter.increment.bind(counter)));

// Fix 3: use an arrow function so it keeps the method's this.
const report = {
  prefix: "item",
  list(items) {
    return items.map((item) => `${this.prefix} ${item}`);
  },
};
attempt("bug 3:", () => report.list(["a", "b"]));

// Fix 4: use method syntax.
const logger = {
  name: "logger",
  describe() {
    return `I am ${this.name}`;
  },
};
attempt("bug 4:", () => logger.describe());

// Fix 5: bind it to the object that owns the data.
const wrapper = { run: counter.increment.bind(counter) };
attempt("bug 5:", () => wrapper.run());
