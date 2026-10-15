function formatName({ first = "", last = "", upper = false } = {}) {
  const full = [first, last].filter(Boolean).join(" ");
  return upper ? full.toUpperCase() : full;
}

console.log(formatName({ first: "Ada", last: "Lovelace" }));
console.log(formatName({ first: "Grace", last: "Hopper", upper: true }));
console.log(formatName({ last: "Turing" }));
console.log(JSON.stringify(formatName()));
