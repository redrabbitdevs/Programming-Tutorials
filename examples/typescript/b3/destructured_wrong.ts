function formatName({ first, last }: { first: string; last: string }): string {
  return `${first} ${last}`;
}
console.log(formatName({ first: "Ada", lst: "Lovelace" }));
