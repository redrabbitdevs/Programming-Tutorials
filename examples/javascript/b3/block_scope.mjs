const outer = "outside";

{
  let inner = "inside";
  const alsoInner = 42;
  var leaky = "var ignores blocks";
  console.log(outer, inner, alsoInner);
}

console.log(leaky);
console.log(typeof inner);
