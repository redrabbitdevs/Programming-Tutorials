const word = "cat";

console.log(word.length, word[0], word.at(-1));

try {
  word[0] = "b";
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

const loud = word.toUpperCase();
console.log(word, loud);
