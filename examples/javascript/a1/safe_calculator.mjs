const operators = new Map([
  ["+", (a, b) => a + b],
  ["-", (a, b) => a - b],
  ["*", (a, b) => a * b],
  ["/", (a, b) => a / b],
]);

function calculate(expression) {
  const parts = expression.trim().split(" ");
  const [left, op, right] = parts;
  const a = Number(left);
  const b = Number(right);
  if (parts.length !== 3 || Number.isNaN(a) || Number.isNaN(b)
    || !operators.has(op)) {
    throw new Error(`cannot evaluate: ${expression}`);
  }
  return operators.get(op)(a, b);
}

console.log(calculate("12 * 3"), calculate("7 / 2"), calculate("10 - 4.5"));
try {
  calculate("2 + process.exit()");
} catch (error) {
  console.log(error.message);
}
