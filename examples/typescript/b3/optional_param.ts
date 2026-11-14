function greet(who: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${who}`;
}

console.log(greet("Ada"));
console.log(greet("Ada", "Welcome"));
