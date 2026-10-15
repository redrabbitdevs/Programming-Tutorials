const asObject = {};
asObject["b"] = 1;
asObject["a"] = 2;
asObject[10] = "ten";
asObject[2] = "two";
console.log(Object.keys(asObject));

const asMap = new Map();
asMap.set("b", 1).set("a", 2).set(10, "ten").set(2, "two");
console.log([...asMap.keys()]);

console.log("toString" in {}, new Map().has("toString"));
console.log(Object.keys(asObject).length, asMap.size);

const counts = {};
counts[1] = "number one";
console.log(counts["1"]);
