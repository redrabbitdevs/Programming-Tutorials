const product = { name: "lamp" };

Object.defineProperty(product, "sku", { value: "L-100" });
console.log(Object.getOwnPropertyDescriptor(product, "sku"));

Object.defineProperty(product, "price", {
  value: 20,
  writable: true,
  enumerable: true,
  configurable: true,
});
console.log(Object.keys(product), product.sku);
