function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hi, I am ${this.name}`;
};

const ada = new Person("Ada");
const grace = new Person("Grace");

console.log(ada.greet(), "/", grace.greet());
console.log(ada.greet === grace.greet);
console.log(Object.getPrototypeOf(ada) === Person.prototype);
console.log(ada.constructor === Person, Object.hasOwn(ada, "constructor"));
console.log(ada);
