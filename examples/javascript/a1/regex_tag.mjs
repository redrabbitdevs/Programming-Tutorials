const quote = (text) => String(text).replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&");

function re(strings, ...values) {
  let source = strings.raw[0];
  for (let i = 0; i < values.length; i++) {
    source += quote(values[i]) + strings.raw[i + 1];
  }
  return new RegExp(source);
}

const domain = "example.com";
const pattern = re`^\w+@${domain}$`;
console.log(pattern, pattern.test("ada@example.com"));
console.log(pattern.test("ada@exampleXcom"));
