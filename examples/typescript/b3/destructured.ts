function formatName({
  first,
  last,
  upper = false,
}: {
  first: string;
  last: string;
  upper?: boolean;
}): string {
  const full = `${first} ${last}`;
  return upper ? full.toUpperCase() : full;
}

console.log(formatName({ first: "Ada", last: "Lovelace" }));
console.log(formatName({ first: "Ada", last: "Lovelace", upper: true }));
