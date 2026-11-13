class Before {
  constructor(name, options = {}) {
    this.name = name;
    if (options.color) this.color = options.color;
    this.size = options.size ?? 1;
  }
}

class After {
  constructor(name, options = {}) {
    this.name = name;
    this.color = options.color ?? null;
    this.size = options.size ?? 1;
  }
}

const b1 = new Before("a");
const b2 = new Before("b", { color: "red" });
console.log("before the fix:", %HaveSameMap(b1, b2));
console.log("after the fix:", %HaveSameMap(new After("a"),
  new After("b", { color: "red" })));
