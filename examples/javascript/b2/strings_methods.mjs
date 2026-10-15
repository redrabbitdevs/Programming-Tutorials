const text = "  Learn JavaScript, one step at a time  ";
const clean = text.trim();

console.log(clean);
console.log(clean.includes("step"), clean.startsWith("Learn"), clean.endsWith("time"));
console.log(clean.indexOf("one"), clean.indexOf("two"));
console.log(clean.slice(0, 5), clean.slice(-4));
console.log(clean.split(", "));
console.log(clean.split(" ").join("-"));
console.log(clean.replaceAll("e", "E"));
console.log("7".padStart(3, "0"), "ab".padEnd(5, ".") + "|");
console.log("ha".repeat(3));
