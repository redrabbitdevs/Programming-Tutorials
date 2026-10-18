const twoPlaces = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
console.log((1.005).toFixed(2), twoPlaces.format(1.005));
console.log(twoPlaces.format("12345678901234567891.125"));

const halfEven = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  roundingMode: "halfEven",
});
console.log(halfEven.format("1.005"), halfEven.format("1.015"));
