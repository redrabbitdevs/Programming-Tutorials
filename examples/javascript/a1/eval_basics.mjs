console.log(eval("2 + 2"));
console.log(eval("let n = 5; n * n"));
console.log(eval("if (true) { 'yes' } else { 'no' }"));
console.log(eval(42), eval({ a: 1 }));

try {
  eval("let = = 1");
} catch (error) {
  console.log(error.name);
}
