const original = {
  name: "Ada",
  scores: [90, 80],
  address: { city: "London" },
};

const copy = { ...original };
copy.name = "Grace";
copy.scores.push(70);
copy.address.city = "Paris";

console.log(original.name);
console.log(original.scores);
console.log(original.address.city);

console.log(copy.scores === original.scores);

const arr = [[1], [2]];
const arrCopy = arr.slice();
arrCopy[0].push("x");
console.log(arr);
