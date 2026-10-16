async function* flaky() {
  yield 1;
  yield 2;
  throw new Error("source broke");
}

try {
  for await (const value of flaky()) {
    console.log("got", value);
  }
} catch (error) {
  console.log("loop failed:", error.message);
}
