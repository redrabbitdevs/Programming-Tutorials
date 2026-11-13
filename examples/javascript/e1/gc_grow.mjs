const kept = [];
for (let i = 0; i < 2_000_000; i++) {
  kept.push({ id: i, label: "item " + i });
}
console.log("kept", kept.length, "objects");
