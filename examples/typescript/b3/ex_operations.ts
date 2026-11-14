const operations: { label: string; run: (n: number) => number }[] = [
  { label: "double", run: (n) => n * 2 },
  { label: "square", run: (n) => n * n },
];

for (const op of operations) {
  console.log(op.label, op.run(5));
}
