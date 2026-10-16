function* steps() {
  console.log("start");
  yield 1;
  console.log("middle");
  yield 2;
  console.log("end");
  return 3;
}

const gen = steps();
console.log("created");
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
