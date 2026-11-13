const prices = { apple: 120, pear: 95 };
const priceOf = (name) => prices[name] ?? "unknown";

console.log("apple:", priceOf("apple"));
console.log("constructor:", priceOf("constructor"));
console.log("toString is a price:", "toString" in prices);

// A Map holds only what you put in it.
const priceMap = new Map(Object.entries(prices));
const safePriceOf = (name) => priceMap.get(name) ?? "unknown";
console.log("Map, constructor:", safePriceOf("constructor"));

// So does an object with no prototype.
const bare = Object.assign(Object.create(null), prices);
console.log("bare, constructor:", bare.constructor ?? "unknown");
console.log("Object.hasOwn(prices, 'toString'):",
  Object.hasOwn(prices, "toString"));
