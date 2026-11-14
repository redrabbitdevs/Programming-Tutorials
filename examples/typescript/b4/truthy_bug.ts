function show(count: number | undefined): string {
  if (count) {
    return `${count} items`;
  }
  return "no count";
}

console.log(show(3), show(0), show(undefined));
