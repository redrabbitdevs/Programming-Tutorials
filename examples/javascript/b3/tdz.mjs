try {
  console.log(later);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

let later = "now it exists";
console.log(later);
