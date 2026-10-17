function loadConfigUnsafe(text) {
  return eval(`(${text})`);
}

const honest = '{ "port": 8080, "debug": false }';
console.log(loadConfigUnsafe(honest));

const hostile = '{ "port": (globalThis.owned = "yes", 8080) }';
console.log(loadConfigUnsafe(hostile), globalThis.owned);

console.log(JSON.parse(honest));
try {
  JSON.parse(hostile);
} catch (error) {
  console.log(error.name);
}
