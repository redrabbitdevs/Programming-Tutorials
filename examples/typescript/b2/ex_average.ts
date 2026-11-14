const row: [string, ...number[]] = ["Ada", 90, 85];
const [student, ...marks] = row;
const average = marks.reduce((sum, m) => sum + m, 0) / marks.length;
console.log(student, average);
