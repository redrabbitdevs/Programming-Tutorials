const sleep = (ms, value) =>
  new Promise((resolve) => setTimeout(resolve, ms, value));

const first = await Promise.any([
  sleep(300, "mirror A"),
  Promise.reject(new Error("mirror B is down")),
  sleep(10, "mirror C"),
]);
console.log("first success:", first);

try {
  await Promise.any([
    Promise.reject(new Error("x")),
    Promise.reject(new Error("y")),
  ]);
} catch (error) {
  console.log(error.name, error instanceof AggregateError);
  console.log(error.message);
  console.log(error.errors.map((e) => e.message));
}
