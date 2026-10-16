const itemCount = 2;
const total = 60;

if (itemCount === 0) {
  console.log("nothing to ship");
} else if (total >= 50) {
  console.log("free shipping");
} else {
  console.log("shipping: 4.99");
}
