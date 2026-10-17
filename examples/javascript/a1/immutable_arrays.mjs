const scores = [30, 10, 20];

const sorted = scores.toSorted((a, b) => a - b);
const reversed = scores.toReversed();
const removed = scores.toSpliced(1, 1);
const replaced = scores.with(0, 99);

console.log(scores);
console.log(sorted, reversed);
console.log(removed, replaced);

scores.sort((a, b) => a - b);
console.log(scores);
