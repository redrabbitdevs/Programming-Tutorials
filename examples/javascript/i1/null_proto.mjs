const plain = {};
const bare = Object.create(null);

console.log("toString" in plain, "toString" in bare);
console.log(Object.getPrototypeOf(bare));

bare.hasOwnProperty = "just data";
console.log(bare.hasOwnProperty);
console.log(Object.keys(bare));
