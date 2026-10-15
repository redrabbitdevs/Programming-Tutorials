function divide(a, b) {
  if (b === 0) {
    throw new Error("cannot divide by zero");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));
  console.log(divide(1, 0));
  console.log("not reached");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error instanceof Error);
}
console.log("the program carries on");
