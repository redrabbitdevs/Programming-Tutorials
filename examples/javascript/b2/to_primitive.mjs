const price = {
  valueOf() {
    return 42;
  },
  toString() {
    return "forty-two";
  },
};

console.log(price + 1);
console.log(price * 2);
console.log(`${price}`);
console.log(String(price));
console.log(price + "");
