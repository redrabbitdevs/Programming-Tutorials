const a = [1, 2];
const b = [1, 2];
const c = a;

console.log(a === b, a === c);
console.log({} === {});

c.push(3);
console.log(a);
