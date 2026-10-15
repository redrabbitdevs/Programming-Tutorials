const outer = "outside";

if (true) {
  let inner = "inside";
  const alsoInner = 42;
  var leaky = "var ignores blocks";
  console.log(outer, inner, alsoInner);
}

console.log(leaky);
console.log(typeof inner);

let name = "outer name";
{
  let name = "inner name";
  console.log(name);
}
console.log(name);
