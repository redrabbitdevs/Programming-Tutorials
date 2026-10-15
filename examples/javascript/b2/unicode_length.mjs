console.log("café".length);
console.log("😀".length);
console.log([..."😀"].length);
console.log("😀".codePointAt(0));

const family = "👨‍👩‍👧";
console.log(family.length, [...family].length);
console.log([...new Intl.Segmenter().segment(family)].length);

const composed = "é";
const decomposed = "é";
console.log(composed.length, decomposed.length);
console.log(composed === decomposed);
console.log(composed === decomposed.normalize());
