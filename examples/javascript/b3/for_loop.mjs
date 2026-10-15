for (let i = 0; i < 3; i++) {
  console.log("i is", i);
}

for (let i = 10; i > 0; i -= 4) {
  console.log("countdown", i);
}

let sum = 0;
for (let i = 1, j = 10; i < j; i++, j--) {
  sum += i * j;
}
console.log(sum);
