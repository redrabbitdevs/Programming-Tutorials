const step = (n) => Promise.resolve(n + 1);

const lost = await step(1).then((n) => {
  step(n);
});
console.log("without return:", lost);

const kept = await step(1).then((n) => {
  return step(n);
});
console.log("with return:", kept);
