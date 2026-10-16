const year = 2000;

const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

console.log(`${year} is ${isLeap ? "a leap year" : "not a leap year"}`);
