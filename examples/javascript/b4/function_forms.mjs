// 1. Declaration
function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

// 2. Function expression
const toFahrenheit2 = function (celsius) {
  return celsius * 9 / 5 + 32;
};

// 3. Arrow function
const toFahrenheit3 = (celsius) => celsius * 9 / 5 + 32;

console.log(toFahrenheit(100), toFahrenheit2(0), toFahrenheit3(37));

const square = (n) => n * n;
const greet = (name, punctuation) => {
  const text = `Hello, ${name}${punctuation}`;
  return text;
};
const makePoint = (x, y) => ({ x, y });
const noArgs = () => "no parameters";

console.log(square(7), greet("Ada", "!"), makePoint(1, 2), noArgs());
