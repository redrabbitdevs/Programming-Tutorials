const kept = await Promise.resolve("value").finally(() => "ignored");
console.log(kept);

const failing = Promise.reject(new Error("boom")).finally(() => {
  console.log("cleanup runs");
});
try {
  await failing;
} catch (error) {
  console.log("still rejected:", error.message);
}
