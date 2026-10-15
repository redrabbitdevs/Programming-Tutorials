// Declaration
function celsiusToFahrenheit(c) {
  return c * 9 / 5 + 32;
}

// Expression
const fahrenheitToCelsius = function (f) {
  return (f - 32) * 5 / 9;
};

// Arrow
const celsiusToKelvin = (c) => c + 273.15;

console.log(celsiusToFahrenheit(100));
console.log(fahrenheitToCelsius(212));
console.log(celsiusToKelvin(0));
console.log(fahrenheitToCelsius(celsiusToFahrenheit(37)));
