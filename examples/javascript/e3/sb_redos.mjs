// Milliseconds one regex test takes on `text`.
function timeTest(regex, text) {
  const start = performance.now();
  regex.test(text);
  return performance.now() - start;
}

const nested = /^(a+)+$/;
const short = timeTest(nested, "a".repeat(18) + "!");
const long = timeTest(nested, "a".repeat(26) + "!");
console.log("8 more characters, over 20x slower:", long > 20 * short);

const flat = /^a+$/;
const flatTime = timeTest(flat, "a".repeat(100_000) + "!");
console.log("flat regex, 100,000 characters, under 50 ms:", flatTime < 50);
