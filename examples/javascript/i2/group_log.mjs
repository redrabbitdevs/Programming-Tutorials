const lines = [
  "WARN low disk",
  "INFO boot",
  "ERROR no route",
  "INFO ready",
  "WARN slow query",
  "INFO idle",
];

const byLevel = new Map();
for (const line of lines) {
  const [level, ...rest] = line.split(" ");
  byLevel.getOrInsert(level, []).push(rest.join(" "));
}

for (const [level, messages] of byLevel) {
  console.log(`${level} (${messages.length}): ${messages.join("; ")}`);
}
