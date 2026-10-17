function failingClose(name) {
  return {
    [Symbol.dispose]() {
      throw new Error(`close ${name} failed`);
    },
  };
}

function history(error) {
  if (error instanceof SuppressedError) {
    return [...history(error.suppressed), error.error.message];
  }
  return [error.message];
}

try {
  using a = failingClose("a");
  using b = failingClose("b");
  throw new Error("work failed");
} catch (error) {
  console.log(history(error));
}
