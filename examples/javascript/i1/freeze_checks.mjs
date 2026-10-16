const sealed = Object.seal({ a: 1 });
const frozen = Object.freeze({ a: 1 });

console.log(Object.isExtensible(sealed), Object.isSealed(sealed));
console.log(Object.isFrozen(sealed), Object.isFrozen(frozen));
