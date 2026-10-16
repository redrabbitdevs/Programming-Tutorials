const scale = { factor: 3 };

const withFunction = [1, 2, 3].map(function (n) {
  return n * this.factor;
}, scale);
console.log(withFunction);

const withArrow = [1, 2, 3].map((n) => n * this?.factor, scale);
console.log(withArrow);
