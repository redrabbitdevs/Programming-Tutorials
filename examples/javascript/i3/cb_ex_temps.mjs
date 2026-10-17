import { promisify } from "node:util";

function getTemperature(city, callback) {
  setTimeout(() => {
    const temps = { Oslo: -3, Cairo: 31 };
    if (!(city in temps)) {
      return callback(new Error(`unknown city ${city}`));
    }
    callback(null, temps[city]);
  }, 5);
}

const getTemperatureAsync = promisify(getTemperature);

console.log("Oslo:", await getTemperatureAsync("Oslo"));
console.log("Cairo:", await getTemperatureAsync("Cairo"));
try {
  await getTemperatureAsync("Mars");
} catch (error) {
  console.log("Error:", error.message);
}
