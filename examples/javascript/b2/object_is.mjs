console.log(NaN === NaN, Object.is(NaN, NaN), Number.isNaN(NaN));
console.log(0 === -0, Object.is(0, -0));
console.log([NaN].includes(NaN), [NaN].indexOf(NaN));
console.log(Object.is("a", "a"), Object.is(1, 1));
