function average(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function totalFromForm(fields) {
  let total = 0;
  for (const field of fields) {
    total = total + Number(field);
  }
  return total;
}

function isEmpty(list) {
  return list.length === 0;
}

function double(n) {
  return n * 2;
}

console.log(average([2, 4, 9]));
console.log(totalFromForm(["10", "20", "30"]));
const list = [1, 2];
console.log(isEmpty(list), list);
console.log(double(4));
