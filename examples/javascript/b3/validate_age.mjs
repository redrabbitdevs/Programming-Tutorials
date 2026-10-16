const age = -5;

try {
  if (age < 0 || age > 120) {
    throw new RangeError("age must be between 0 and 120");
  }
  console.log("age is OK");
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
