function greet(person: { name: string }): string {
  return `Hello, ${person.name}`;
}

const visitor = { name: "Ada", age: 36 };
console.log(greet(visitor));
