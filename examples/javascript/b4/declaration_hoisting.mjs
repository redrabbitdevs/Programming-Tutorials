console.log(add(2, 3));

function add(a, b) {
  return a + b;
}

try {
  console.log(multiply(2, 3));
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(2, 3));
