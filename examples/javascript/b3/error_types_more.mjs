try {
  JSON.parse("{bad json");
} catch (error) {
  console.log(error.name);
}

try {
  decodeURIComponent("%");
} catch (error) {
  console.log(error.name);
}
