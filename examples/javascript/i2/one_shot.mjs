const numbers = [1, 2, 3];
console.log([...numbers], [...numbers]);

const iterator = numbers.values();
console.log([...iterator], [...iterator]);
console.log(iterator[Symbol.iterator]() === iterator);
