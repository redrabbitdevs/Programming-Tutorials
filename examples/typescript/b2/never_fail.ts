function fail(message: string): never {
  throw new Error(message);
}

function half(n: number): number {
  return n % 2 === 0 ? n / 2 : fail(`${n} is odd`);
}

console.log(half(8));
try {
  half(7);
} catch (error) {
  console.log(String(error));
}
