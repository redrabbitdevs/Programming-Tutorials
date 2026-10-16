try {
  null.length;
} catch (error) {
  const lines = error.stack.split("\n");
  console.log(lines[0]);
  console.log(lines[1].trim().startsWith("at "));
}
