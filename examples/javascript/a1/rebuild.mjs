function upperValues(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) {
    out += String(values[i]).toUpperCase() + strings[i + 1];
  }
  return out;
}

const city = "Lima";
const days = 3;
console.log(upperValues`Trip to ${city} for ${days} days`);
