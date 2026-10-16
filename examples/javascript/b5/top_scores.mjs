const scores = [40, 100, 75, 9, 88];
const top = scores.toSorted((a, b) => b - a).slice(0, 3);
console.log(top, scores);
