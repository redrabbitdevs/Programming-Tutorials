function inspect(strings, ...values) {
  console.log(strings, values);
  return strings.length - values.length;
}

const item = "tea";
const price = 3.5;

console.log(inspect`${item} costs ${price} today`);
console.log(inspect`no values at all`);
