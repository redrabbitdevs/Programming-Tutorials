let declared;
console.log(declared);

const user = { name: "Ada" };
console.log(user.age);

function echo(value) {
  return value;
}
console.log(echo());

function noReturn() {}
console.log(noReturn());

console.log([10, 20][5]);

const empty = null;
console.log(empty, typeof empty, typeof undefined);
console.log(null == undefined, null === undefined);
