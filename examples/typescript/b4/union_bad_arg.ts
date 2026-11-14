function formatId(id: string | number): string {
  return `ID-${id}`;
}

console.log(formatId(true));
console.log(formatId(null));
