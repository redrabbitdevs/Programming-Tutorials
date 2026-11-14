function celsiusToFahrenheit(celsius: number): number {
  return celsius * 9 / 5 + 32;
}

function kmToMiles(km: number): number {
  return km * 0.621371;
}

console.log(celsiusToFahrenheit(100));
console.log(kmToMiles(10).toFixed(2));
