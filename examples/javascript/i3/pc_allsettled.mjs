const sleep = (ms, value) =>
  new Promise((resolve) => setTimeout(resolve, ms, value));

const results = await Promise.allSettled([
  sleep(10, "a"),
  Promise.reject(new Error("b failed")),
  sleep(5, "c"),
]);

for (const result of results) {
  if (result.status === "fulfilled") {
    console.log("ok:", result.value);
  } else {
    console.log("failed:", result.reason.message);
  }
}
console.log(results[0]);
