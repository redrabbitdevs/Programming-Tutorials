const either = /(?<y>\d{4})-(?<m>\d\d)|(?<m>\d\d)\/(?<y>\d{4})/;
for (const input of ["2026-03", "03/2026"]) {
  const { y, m } = either.exec(input).groups;
  console.log(y, m);
}

const mixed = /(?i:hello) World/;
console.log(mixed.test("HELLO World"), mixed.test("HELLO world"));
const strict = /a(?-i:B)c/i;
console.log(strict.test("AbC"), strict.test("ABC"));
