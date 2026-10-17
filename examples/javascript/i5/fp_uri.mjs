console.log(encodeURIComponent("red shoes & socks/100%"));
console.log(decodeURIComponent("red%20shoes"));

try {
  decodeURIComponent("100%");
} catch (error) {
  console.log(error.name, error.message);
}
