let name = "outer name";

{
  let name = "inner name";
  console.log(name);
}

console.log(name);
