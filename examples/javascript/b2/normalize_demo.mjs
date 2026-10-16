const composed = "\u00e9";
const decomposed = "e\u0301";

console.log(composed, decomposed);
console.log(composed.length, decomposed.length);
console.log(composed === decomposed);
console.log(composed === decomposed.normalize());
