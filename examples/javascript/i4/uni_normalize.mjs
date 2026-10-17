const composed = "café";
const decomposed = "café";
console.log(composed === decomposed, composed.length, decomposed.length);
console.log(composed.normalize("NFD") === decomposed);
console.log(decomposed.normalize("NFC") === composed);

const stripAccents = (s) => s.normalize("NFD").replace(/\p{M}/gu, "");
console.log(stripAccents("Crème brûlée, señor"));

console.log("ﬁnd".normalize("NFKC"), "①".normalize("NFKC"));
console.log("ﬁnd".normalize("NFC") === "find");
