const kept = [];
for (let i = 0; i < 1_000_000; i++) {
  const temp = { id: i, label: "item " + i };
  if (i % 1000 === 0) kept.push(temp);
}
console.log("kept", kept.length, "objects");
