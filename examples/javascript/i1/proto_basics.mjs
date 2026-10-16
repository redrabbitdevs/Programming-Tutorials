const animal = {
  sound: "...",
  speak() {
    return `${this.name} says ${this.sound}`;
  },
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.sound = "woof";

console.log(dog.speak());
console.log(Object.getPrototypeOf(dog) === animal);
console.log(dog);
