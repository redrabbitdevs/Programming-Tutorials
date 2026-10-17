const text = "a1b22c333";
const first = text.match(/\d+/);
console.log(first[0], first.index);
console.log(text.match(/\d+/g));
console.log(/hello/i.test("HELLO"));

const lines = "one\ntwo\nthree";
console.log(lines.match(/^\w+$/gm));
console.log(/a.c/.test("a\nc"), /a.c/s.test("a\nc"));
console.log("😀".match(/./g).length, "😀".match(/./gu).length);
