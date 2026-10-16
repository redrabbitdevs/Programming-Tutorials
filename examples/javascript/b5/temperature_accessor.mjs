const temperature = {
  celsius: 100,
  get fahrenheit() {
    return (this.celsius * 9) / 5 + 32;
  },
  set fahrenheit(value) {
    this.celsius = ((value - 32) * 5) / 9;
  },
};

console.log(temperature.fahrenheit);
temperature.fahrenheit = 32;
console.log(temperature.celsius);
temperature.celsius = 37;
console.log(temperature.fahrenheit);
