interface Named {
  name: string;
}

interface Greeter {
  greet(): string;
}

class Person implements Named, Greeter {
  name = "Ada";

  greet(): string {
    return `Hi, I am ${this.name}`;
  }
}

console.log(new Person().greet());
