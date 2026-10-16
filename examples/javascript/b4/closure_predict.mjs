let x = 1;
const getOuter = () => x;

function make() {
  let x = 10;
  return () => x;
}
const getInner = make();

x = 2;
console.log(getOuter(), getInner());
x = 3;
console.log(getOuter(), getInner());
