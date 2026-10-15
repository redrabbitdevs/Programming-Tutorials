const ada = new Set(["grace", "linus", "alan"]);
const bob = new Set(["alan", "dennis", "grace"]);

console.log(ada.union(bob));
console.log(ada.intersection(bob));
console.log(ada.difference(bob));
console.log(ada.symmetricDifference(bob));

console.log(new Set(["alan"]).isSubsetOf(ada));
console.log(ada.isSupersetOf(new Set(["alan", "x"])));
console.log(ada.isDisjointFrom(new Set(["zed"])));
