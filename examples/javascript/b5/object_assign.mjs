const defaults = { theme: "light", size: 12 };
const settings = Object.assign({}, defaults, { size: 16 });
console.log(settings, defaults);

const target = { a: 1 };
const result = Object.assign(target, { b: 2 });
console.log(result === target, target);
