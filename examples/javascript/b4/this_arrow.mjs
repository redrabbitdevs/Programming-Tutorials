const timer = {
  label: "clock",
  ticks: [1, 2, 3],
  describeWithFunction() {
    return this.ticks.map(function (t) {
      return `${this?.label}:${t}`;
    });
  },
  describeWithArrow() {
    return this.ticks.map((t) => `${this.label}:${t}`);
  },
  arrowAsMethod: () => typeof this,
};

console.log(timer.describeWithFunction());
console.log(timer.describeWithArrow());
console.log(timer.arrowAsMethod());
