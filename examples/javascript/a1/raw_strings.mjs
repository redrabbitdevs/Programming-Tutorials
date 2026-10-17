function both(strings) {
  return [strings[0], strings.raw[0]];
}
console.log(both`one\ttwo`);

console.log(String.raw`C:\Users\new\table.txt`);
console.log("C:\\Users\\new\\table.txt");

const folder = "temp";
console.log(String.raw`C:\${folder}`);

const digits = String.raw`\d+\.\d+`;
console.log(digits, new RegExp(digits).test("3.14"));
