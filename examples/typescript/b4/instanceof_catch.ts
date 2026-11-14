function risky(): never {
  throw new RangeError("out of range");
}

try {
  risky();
} catch (error) {
  if (error instanceof Error) {
    console.log(error.name, "-", error.message);
  } else {
    console.log("not an Error:", String(error));
  }
}
