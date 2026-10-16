function sleep(ms, value) {
  return new Promise((resolve) => setTimeout(resolve, ms, value));
}

console.log("waiting");
sleep(20, "first")
  .then((value) => {
    console.log(value);
    return sleep(10, "second");
  })
  .then((value) => console.log(value));
