const first = [1, 2];
const second = [3, 4];
console.log([...first, ...second, 5]);
console.log([0, ...first]);
console.log(Math.max(...first, ...second));
console.log([..."abc"]);

const base = { a: 1, b: 2 };
console.log({ ...base, c: 3 });
console.log({ ...base, b: 20 });
console.log({ b: 20, ...base });

console.log({ ...null, ...undefined, ...[9, 8] });

function total(label, ...numbers) {
  return `${label}: ${numbers.reduce((s, n) => s + n, 0)}`;
}
console.log(total("sum", 1, 2, 3));
console.log(total("none"));
