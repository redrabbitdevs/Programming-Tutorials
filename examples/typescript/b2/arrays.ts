const scores: number[] = [90, 85, 72];
const names: Array<string> = ["Ada", "Grace"];

scores.push(100);
console.log(scores.length, names[0]);
console.log(scores.map((s) => s / 10));
