const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };

const joined = Array.prototype.join.call(arrayLike, "-");
console.log(joined);

const upper = Array.prototype.map.call("abc", (ch) => ch.toUpperCase());
console.log(upper);
