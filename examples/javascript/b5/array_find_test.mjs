const scores = [72, 95, 58, 88, 95];

console.log(scores.find((s) => s > 90));
console.log(scores.findIndex((s) => s > 90));
console.log(scores.findLast((s) => s > 90));
console.log(scores.findLastIndex((s) => s > 90));
console.log(scores.find((s) => s > 100));
console.log(scores.findIndex((s) => s > 100));

console.log(scores.some((s) => s < 60));
console.log(scores.every((s) => s >= 50));
console.log(scores.every((s) => s >= 60));

console.log([].some((s) => s > 0), [].every((s) => s > 0));
