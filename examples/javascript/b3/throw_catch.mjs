const divisor = 0;

try {
  if (divisor === 0) {
    throw new Error("cannot divide by zero");
  }
  console.log(10 / divisor);
  console.log("not reached");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error instanceof Error);
}

console.log("the program carries on");
