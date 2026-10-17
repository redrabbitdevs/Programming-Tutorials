const m = /(?<word>b+)/d.exec("aabbbc");
console.log(m.indices[0], m.indices.groups.word);

const text = "aabbbc";
const [start, end] = m.indices.groups.word;
const marked = text.slice(0, start) + "[" + text.slice(start, end) + "]";
console.log(marked + text.slice(end));
