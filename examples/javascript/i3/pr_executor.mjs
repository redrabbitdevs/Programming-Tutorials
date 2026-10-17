console.log("before");
const p = new Promise((resolve) => {
  console.log("inside executor");
  resolve("value");
  console.log("after resolve call");
});
p.then((value) => console.log("then got", value));
console.log("after then call");
