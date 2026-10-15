function inner() {
  throw new Error("something broke");
}
function outer() {
  inner();
}

try {
  outer();
} catch (error) {
  const lines = error.stack.split("\n");
  console.log(lines[0]);
  console.log(lines[1].trim().startsWith("at inner"));
  console.log(lines[2].trim().startsWith("at outer"));
}
