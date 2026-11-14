function textLength(text: string | null): number {
  return text === null ? 0 : text.length;
}

console.log(textLength("abc"), textLength(null));
