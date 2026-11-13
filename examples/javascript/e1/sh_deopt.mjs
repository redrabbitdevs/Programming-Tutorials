function lengthOf(v) {
  return Math.hypot(v.x, v.y);
}

%PrepareFunctionForOptimization(lengthOf);
lengthOf({ x: 3, y: 4 });
lengthOf({ x: 6, y: 8 });
%OptimizeFunctionOnNextCall(lengthOf);
lengthOf({ x: 5, y: 12 });
console.log("optimized:", %ActiveTierIsTurbofan(lengthOf));

lengthOf({ y: 4, x: 3 });
console.log("after another shape:", %ActiveTierIsTurbofan(lengthOf));
