const flaky = {
  [Symbol.dispose]() {
    throw new Error("close failed");
  },
};

try {
  using resource = flaky;
  throw new Error("work failed");
} catch (error) {
  console.log(error.name);
  console.log("error:", error.error.message);
  console.log("suppressed:", error.suppressed.message);
}

try {
  using resource = flaky;
  console.log("work succeeded");
} catch (error) {
  console.log(error.name, error.message);
}
