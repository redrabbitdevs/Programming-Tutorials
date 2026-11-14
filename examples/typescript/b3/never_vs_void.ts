function halt(message: string): never {
  throw new Error(message);
}

function report(message: string): void {
  console.log(message);
}

try {
  report("fine");
  halt("halted");
} catch (error) {
  console.log(String(error));
}
