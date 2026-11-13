const text = "the constructor of the __proto__ of the toString";

// Buggy: a plain object already "has" every name on Object.prototype.
function countBuggy(words) {
  const counts = {};
  for (const word of words) counts[word] = (counts[word] || 0) + 1;
  return counts;
}

// Fixed: a Map starts empty and accepts any string as a key.
function countWords(words) {
  const counts = new Map();
  for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
  return counts;
}

const words = text.split(" ");
const buggy = countBuggy(words);
console.log("buggy constructor:", buggy.constructor);
console.log("buggy __proto__:", buggy.__proto__);
console.log("buggy keys:", Object.keys(buggy).length);

const counts = countWords(words);
console.log("fixed:", Object.fromEntries(counts));
console.log("fixed keys:", counts.size);
