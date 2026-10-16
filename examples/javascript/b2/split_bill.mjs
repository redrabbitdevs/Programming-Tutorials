const billCents = 8750;
const people = 4;

const shareCents = Math.floor(billCents / people);
const leftOver = billCents % people;

console.log(`Each pays: ${(shareCents / 100).toFixed(2)}`);
console.log(`Left over: ${leftOver} cents`);
