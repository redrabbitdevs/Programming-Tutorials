function formatName({ first, last, upper = false } = {}) {
  const full = `${first ?? ""} ${last ?? ""}`.trim();
  return upper ? full.toUpperCase() : full;
}

console.log(formatName({ first: "Ada", last: "Lovelace" }));
console.log(formatName({ last: "Hopper", first: "Grace", upper: true }));
console.log(formatName({ first: "Linus" }));
console.log(JSON.stringify(formatName()));

function distance([x1, y1], [x2, y2]) {
  return Math.hypot(x2 - x1, y2 - y1);
}
console.log(distance([0, 0], [3, 4]));
