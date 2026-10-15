const original = [3, 1, 2];

console.log(original.toSorted(), original);
console.log(original.toReversed(), original);
console.log(original.with(1, 99), original);
console.log(original.toSpliced(1, 1, "a", "b"), original);

original.reverse();
console.log(original);
