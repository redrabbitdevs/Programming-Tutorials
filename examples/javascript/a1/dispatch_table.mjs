const operations = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  max: Math.max,
};

function run(name, a, b) {
  if (!Object.hasOwn(operations, name)) {
    throw new Error(`unknown operation: ${name}`);
  }
  return operations[name](a, b);
}

console.log(run("add", 2, 3), run("max", 2, 3));
try {
  run("constructor", 1, 2);
} catch (error) {
  console.log(error.message);
}
