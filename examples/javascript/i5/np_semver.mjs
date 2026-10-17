const parse = (text) => text.split(".").map(Number);

function compare(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

function upperBound([major, minor, patch], kind) {
  if (kind === "~") return [major, minor + 1, 0];
  if (major > 0) return [major + 1, 0, 0];
  if (minor > 0) return [0, minor + 1, 0];
  return [0, 0, patch + 1];
}

function satisfies(version, range) {
  const low = parse(range.slice(1));
  const high = upperBound(low, range[0]);
  const v = parse(version);
  return compare(v, low) >= 0 && compare(v, high) < 0;
}

const versions = "0.0.3 0.2.9 0.3.0 1.2.3 1.3.0 1.9.0 2.0.0".split(" ");
for (const range of ["^1.2.3", "^0.2.3", "^0.0.3", "~1.2.3"]) {
  const ok = versions.filter((v) => satisfies(v, range));
  console.log(range.padEnd(7), ok.join(" "));
}
console.log("1.10.0" > "1.9.0", compare(parse("1.10.0"), parse("1.9.0")) > 0);
