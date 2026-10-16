const item = { count: 1 };
Object.defineProperty(item, "id", {
  value: 7,
  writable: true,
  configurable: false,
});

try {
  delete item.id;
} catch (error) {
  console.log("delete:", error.name);
}

try {
  Object.defineProperty(item, "id", { enumerable: true });
} catch (error) {
  console.log("redefine:", error.name);
}

item.id = 8;
Object.defineProperty(item, "id", { writable: false });
console.log(item.id, Object.getOwnPropertyDescriptor(item, "id").writable);
