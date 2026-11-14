const stock = new Map([["apple", 5]]);

try {
  console.log(stock.get("apple")!.toFixed(1));
  console.log(stock.get("pear")!.toFixed(1));
} catch (error) {
  console.log(String(error));
}
