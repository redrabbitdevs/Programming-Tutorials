function add(a, b, c) {
  return a + b + c;
}

const addTen = add.bind(null, 10);
console.log(addTen.name, addTen.length);
console.log(addTen(1, 2));

const again = addTen.bind(null, 20);
console.log(again(3));
