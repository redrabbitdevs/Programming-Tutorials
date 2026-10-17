const add = new Function("a", "b", "return a + b;");
console.log(add(2, 3), add.name, add.length);

function makeTaxer() {
  const rate = 0.2;
  const sees = new Function("return typeof rate;");
  const takes = new Function("price", "rate", "return price * (1 + rate);");
  return [sees(), takes(100, rate)];
}
console.log(makeTaxer());
