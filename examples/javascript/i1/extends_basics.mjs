class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return `${super.speak()}: woof`;
  }
}

const rex = new Dog("Rex", "collie");
console.log(rex.speak());
console.log(rex instanceof Dog, rex instanceof Animal);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
console.log(rex);
