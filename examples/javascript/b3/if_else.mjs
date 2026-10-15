function describeTemperature(celsius) {
  if (celsius < 0) {
    return "freezing";
  } else if (celsius < 15) {
    return "cold";
  } else if (celsius < 25) {
    return "mild";
  } else {
    return "hot";
  }
}

for (const t of [-5, 10, 20, 31]) {
  console.log(t, describeTemperature(t));
}

const name = "";
if (name) {
  console.log("has a name");
} else {
  console.log("name is empty");
}
