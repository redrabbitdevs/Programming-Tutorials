function fail(message: string): never {
  throw new Error(message);
}

function requirePositive(n: number): number {
  if (n <= 0) {
    fail(`expected a positive number, got ${n}`);
  }
  return n;
}

console.log(requirePositive(5));
try {
  requirePositive(-1);
} catch (error) {
  console.log(String(error));
}
