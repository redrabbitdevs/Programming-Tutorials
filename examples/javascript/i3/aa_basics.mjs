async function double(n) {
  return n * 2;
}

async function fail() {
  throw new Error("failed inside");
}

const promise = double(21);
console.log(promise instanceof Promise);
console.log(await promise);
fail().catch((error) => console.log("rejected:", error.message));
