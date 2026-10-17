setTimeout(() => console.log("timer"), 0);

let n = 0;
function more() {
  n += 1;
  console.log("microtask", n);
  if (n < 3) queueMicrotask(more);
}
queueMicrotask(more);
console.log("sync done");
