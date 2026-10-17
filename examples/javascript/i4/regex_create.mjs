const literal = /colou?r/;
const built = new RegExp("colou?r");
console.log(literal.test("my color"), built.test("my colour"));
console.log(literal.source, literal.flags === "");

const word = "cat";
const dynamic = new RegExp(`\\b${word}s?\\b`, "i");
console.log(dynamic.test("Two CATS sat"));
console.log(String(dynamic));
