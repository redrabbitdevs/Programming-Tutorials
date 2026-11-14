class Animal {
  speak(): string {
    return "...";
  }
}

class Dog extends Animal {
  override spek(): string {
    return "Woof";
  }
}

console.log(new Dog().speak());
