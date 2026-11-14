class Animal {
  speak(): string {
    return "...";
  }
}

class Dog extends Animal {
  override speak(): string {
    return "Woof";
  }
}

console.log(new Animal().speak(), new Dog().speak());
