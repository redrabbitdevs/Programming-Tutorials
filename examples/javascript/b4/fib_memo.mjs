function fibSlow(n) {
  return n < 2 ? n : fibSlow(n - 1) + fibSlow(n - 2);
}

function fibMemo(n, memo = new Map()) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const value = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, value);
  return value;
}

console.log(fibSlow(20));
console.log(fibMemo(20));
console.log(fibMemo(50));
