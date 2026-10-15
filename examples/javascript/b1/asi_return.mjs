function broken() {
  return
    42;
}

function fixed() {
  return 42;
}

console.log(broken());
console.log(fixed());
