const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

function firstChar(text) {
  const [first] = segmenter.segment(text);
  return first?.segment ?? "";
}

function charCount(text) {
  return [...segmenter.segment(text)].length;
}

for (const s of ["😀 party", "👩‍💻 dev", "🇯🇵 Tokyo", "école"]) {
  console.log(firstChar(s), charCount(s), s.length);
}
