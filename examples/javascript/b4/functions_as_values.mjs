function shout(text) {
  return text.toUpperCase() + "!";
}

const alias = shout;
console.log(alias("hey"));

const tools = [shout, (text) => text.toLowerCase()];
console.log(tools[0]("ready"), tools[1]("QUIET"));

const actions = {
  double: (n) => n * 2,
  negate: (n) => -n,
};
console.log(actions.double(21), actions["negate"](5));

function apply(fn, value) {
  return fn(value);
}
console.log(apply(shout, "pass me"));
console.log(apply((n) => n + 1, 41));

console.log(typeof shout, shout.name, shout.length);
console.log(alias === shout);
