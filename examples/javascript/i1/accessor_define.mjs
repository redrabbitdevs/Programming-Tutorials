const temperature = { celsius: 20 };

Object.defineProperty(temperature, "fahrenheit", {
  get() {
    return (this.celsius * 9) / 5 + 32;
  },
  set(value) {
    this.celsius = ((value - 32) * 5) / 9;
  },
  enumerable: true,
  configurable: true,
});

console.log(temperature.fahrenheit);
temperature.fahrenheit = 212;
console.log(temperature.celsius, Object.keys(temperature));
