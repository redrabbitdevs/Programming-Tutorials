Promise.resolve(2)
  .then((n) => n * 2)
  .then((n) => {
    console.log("got", n);
    return new Promise((resolve) => setTimeout(resolve, 10, n + 1));
  })
  .then((n) => console.log("after the wait:", n));
