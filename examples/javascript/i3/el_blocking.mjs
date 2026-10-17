const start = Date.now();
setTimeout(() => {
  console.log("timer ran, late:", Date.now() - start >= 50);
}, 10);

while (Date.now() - start < 50) {
  // busy: nothing else can run
}
console.log("loop finished");
