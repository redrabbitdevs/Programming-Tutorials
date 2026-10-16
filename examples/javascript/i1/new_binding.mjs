function Counter(start) {
  this.value = start;
}

const c = new Counter(3);
console.log(c.value, c instanceof Counter);

try {
  Counter(1);
} catch (error) {
  console.log(error.name);
}
