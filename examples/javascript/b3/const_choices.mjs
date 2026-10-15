const names = ["Ada", "Grace"];
names.push("Linus");
console.log(names);

const frozen = Object.freeze({ id: 1 });
try {
  frozen.id = 2;
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
console.log(frozen);
