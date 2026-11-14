function length(text: string | null | undefined): number {
  if (text != null) {
    return text.length;
  }
  return 0;
}

console.log(length("abc"), length(null), length(undefined));
