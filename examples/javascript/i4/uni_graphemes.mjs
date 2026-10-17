const family = "👨‍👩‍👧";
const flag = "🇯🇵";
const accented = "é";

for (const s of [family, flag, accented]) {
  console.log(s.length, [...s].length);
}

const seg = new Intl.Segmenter("en", { granularity: "grapheme" });
const graphemes = (s) => Array.from(seg.segment(s), (part) => part.segment);

for (const s of [family, flag, accented]) {
  console.log(graphemes(s).length);
}
console.log(graphemes("a👨‍👩‍👧é"));
