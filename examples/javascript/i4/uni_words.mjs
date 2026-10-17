const words = new Intl.Segmenter("en", { granularity: "word" });
const text = "Well, it's 3.5 days!";

const found = [];
for (const part of words.segment(text)) {
  if (part.isWordLike) {
    found.push(part.segment);
  }
}
console.log(found);
