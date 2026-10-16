const stock = { apple: 3, pear: 0, plum: 5 };
const inStock = Object.keys(stock).filter((name) => stock[name] > 0);
console.log(inStock);
