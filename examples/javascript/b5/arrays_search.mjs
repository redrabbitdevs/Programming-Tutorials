const nums = [10, 20, 30, 20, NaN];

console.log(nums.includes(20), nums.includes(99));
console.log(nums.indexOf(20), nums.lastIndexOf(20), nums.indexOf(99));

console.log(nums.includes(NaN), nums.indexOf(NaN));

const a = { id: 1 };
const list = [a, { id: 2 }];
console.log(list.includes(a), list.includes({ id: 1 }));
