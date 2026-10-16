const vehicle = {
  wheels: 0,
  describe() {
    return `${this.name} has ${this.wheels} wheels`;
  },
};

const car = Object.create(vehicle);
car.name = "Civic";
car.wheels = 4;

const bike = Object.create(vehicle);
bike.name = "Bike";
bike.wheels = 2;

const cart = Object.create(vehicle);
cart.name = "Cart";

console.log(car.describe());
console.log(bike.describe());
console.log(cart.describe());
console.log(Object.hasOwn(cart, "wheels"));
