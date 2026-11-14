function repeat(text: string, times: number): string {
  return text.repeat(times);
}

// @ts-expect-error: times must be a number
console.log(repeat("ab", "3"));
