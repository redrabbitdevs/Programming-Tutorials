function noReturn(a, b) {
  a + b;
}

function earlyReturn(n) {
  if (n < 0) {
    return;
  }
  return n * 2;
}

function asiReturn() {
  return
  42;
}

console.log(noReturn(1, 2));
console.log(earlyReturn(-1), earlyReturn(4));
console.log(asiReturn());
