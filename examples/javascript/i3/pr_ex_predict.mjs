console.log("1");
const p = new Promise((resolve) => {
  console.log("2");
  resolve("3");
});
p.then((value) => {
  console.log(value);
  throw new Error("4");
})
  .catch(() => console.log("5"))
  .finally(() => console.log("6"));
console.log("7");
