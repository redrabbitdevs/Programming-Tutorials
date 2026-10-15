function average(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function totalFromForm(fields) {
  let total = 0;
  for (const field of fields) {
    total = total + field;
  }
  return total;
}

function isEmpty(list) {
  if (list.length = 0) {
    return true;
  }
  return false;
}

function double(n) {
  n * 2;
}

console.log(average([2, 4, 9]));
console.log(totalFromForm(["10", "20", "30"]));
const list = [1, 2];
console.log(isEmpty(list), list);
console.log(double(4));
