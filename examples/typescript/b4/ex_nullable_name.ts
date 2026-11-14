function greet(name: string | null): string {
  return name === null ? "Hello, guest" : `Hello, ${name}`;
}

console.log(greet("Ada"));
console.log(greet(null));
