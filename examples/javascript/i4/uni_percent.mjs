const query = "café & crème?";
const encoded = encodeURIComponent(query);

console.log(encoded);
console.log(decodeURIComponent(encoded) === query);
console.log(encodeURIComponent("😀"));
console.log(encodeURI("/search?q=café"));
console.log(encodeURIComponent("/search?q=café"));
