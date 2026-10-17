const found = /(\d+)-(\d+)/.exec("call 555-1234 now");
console.log(found[0], found[1], found[2], found.index);
console.log(/(\d+)-(\d+)/.exec("no number"));

const re = /o/g;
console.log(re.test("foo"), re.lastIndex);
console.log(re.test("foo"), re.lastIndex);
console.log(re.test("foo"), re.lastIndex);

const text = "2026-03-14 and 2027-01-02";
for (const m of text.matchAll(/(\d{4})-(\d{2})-(\d{2})/g)) {
  console.log(m[0], "year", m[1], "at", m.index);
}

try {
  text.matchAll(/\d+/);
} catch (error) {
  console.log(error.name);
}
