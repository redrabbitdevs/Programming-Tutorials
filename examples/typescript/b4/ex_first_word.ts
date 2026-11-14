function firstWord(text: string | null): string {
  if (typeof text !== "string") {
    return "";
  }
  return text.split(" ")[0];
}

console.log(firstWord("hello world"));
console.log(JSON.stringify(firstWord(null)));
