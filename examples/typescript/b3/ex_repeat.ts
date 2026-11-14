function repeatText(text: string, times = 2, separator = " "): string {
  return Array(times).fill(text).join(separator);
}

console.log(repeatText("ha"));
console.log(repeatText("ha", 3, "-"));
