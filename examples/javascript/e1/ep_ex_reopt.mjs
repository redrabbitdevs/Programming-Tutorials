function half(n) {
  return n / 2;
}

function optimize() {
  %PrepareFunctionForOptimization(half);
  half(8);
  half(9);
  %OptimizeFunctionOnNextCall(half);
  half(10);
}

optimize();
console.log("optimized for numbers:", %ActiveTierIsTurbofan(half));
half("10");
console.log("after a string:", %ActiveTierIsTurbofan(half));
optimize();
console.log("optimized again:", %ActiveTierIsTurbofan(half));
half("12");
console.log("string again:", %ActiveTierIsTurbofan(half));
