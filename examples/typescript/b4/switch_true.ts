function classify(value: string | number | null): string {
  switch (true) {
    case typeof value === "string":
      return `text of ${value.length}`;
    case typeof value === "number":
      return `number ${value.toFixed(1)}`;
    default:
      return "nothing";
  }
}

console.log(classify("hey"), classify(2), classify(null));
