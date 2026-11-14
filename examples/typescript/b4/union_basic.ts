function formatId(id: string | number): string {
  return `ID-${id}`;
}

console.log(formatId(7));
console.log(formatId("A7"));
