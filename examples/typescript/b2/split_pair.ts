function parsePair(text: string): [string, string] {
  return text.split("=");
}
console.log(parsePair("name=Ada"));
