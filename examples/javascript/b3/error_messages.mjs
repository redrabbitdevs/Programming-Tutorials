try {
  undefinedVariable;
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

try {
  null.length;
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

try {
  new Array(-1);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
