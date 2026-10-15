let depth = 0;
function recurse() {
  depth++;
  recurse();
}

try {
  recurse();
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error instanceof RangeError);
  console.log(depth > 1000);
}
