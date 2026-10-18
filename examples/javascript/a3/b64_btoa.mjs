try {
  btoa("€");
} catch (error) {
  console.log(error.name);
}
console.log(atob("aMOpbGxv"));
