function total(json) {
  return Promise.resolve(json)
    .then((text) => JSON.parse(text))
    .then((numbers) => numbers.reduce((sum, n) => sum + n, 0))
    .then((sum) => `total = ${sum}`)
    .catch((error) => `bad input (${error.name})`);
}

console.log(await total("[1, 2, 3]"));
console.log(await total("[1,"));
