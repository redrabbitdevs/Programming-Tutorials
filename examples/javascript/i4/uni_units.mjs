const smile = "\u{1F600}";
console.log(smile.length, smile === "😀");
console.log(smile.charCodeAt(0).toString(16), smile.charCodeAt(1).toString(16));
console.log(smile.codePointAt(0).toString(16));
console.log(smile.codePointAt(1).toString(16));
console.log(String.fromCodePoint(0x1f600) === smile);

const word = "a😀b";
console.log(word.length, [...word].length);
console.log(word.slice(0, 2) === "a😀", word.slice(0, 2).length);
for (const ch of word) {
  console.log(ch, ch.codePointAt(0));
}
