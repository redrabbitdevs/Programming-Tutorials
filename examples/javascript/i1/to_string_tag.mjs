const report = { [Symbol.toStringTag]: "Report" };

console.log(Object.prototype.toString.call(report));
console.log(String(report));
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(new Map()));
