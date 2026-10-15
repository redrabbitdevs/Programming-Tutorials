const numbers = [10, 9, 1, 100];
const sorted = numbers.sort();
console.log(sorted);
console.log(sorted === numbers);

console.log(["banana", "apple", "Cherry"].sort());
console.log([3, undefined, 1, 2].sort());

const nums = [10, 9, 1, 100];
nums.sort((a, b) => a - b);
console.log(nums);

const names = ["Émile", "zoe", "Ada", "bob"];
console.log([...names].sort());
console.log([...names].sort((a, b) => a.localeCompare(b, "en")));
