const text = "cost $42, 17 euro, $5";
console.log(text.match(/(?<=\$)\d+/g));
console.log(text.match(/\d+(?= euro)/g));
console.log(text.match(/(?<!\$)\b\d+\b/g));

const digits = "1234567";
console.log(digits.replace(/\B(?=(\d{3})+(?!\d))/g, ","));

const strong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
console.log(strong.test("Passw0rdX"), strong.test("password1"));
