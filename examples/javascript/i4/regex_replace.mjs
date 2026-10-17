const date = "2026-03-14";
console.log(date.replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1"));
console.log("a.b.c".replace(".", "-"), "a.b.c".replace(/\./g, "-"));
console.log("a.b.c".replaceAll(".", "-"));

const prices = "apple 3, pear 12";
console.log(prices.replace(/\d+/g, (n) => String(Number(n) * 2)));

const name = "Ada Lovelace";
const swap = (all, first, last) => `${last}, ${first}`;
console.log(name.replace(/(\w+) (\w+)/, swap));

console.log("a1b22c".split(/\d+/));
console.log("one, two;three  four".split(/[,; ]+/));
