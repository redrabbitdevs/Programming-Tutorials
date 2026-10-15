let message = "first";
const show = () => message;

console.log(show());
message = "second";
console.log(show());

function makeAdder(amount) {
  return (n) => n + amount;
}
const addFive = makeAdder(5);
const addTen = makeAdder(10);
console.log(addFive(1), addTen(1));
