const thenable = {
  then(resolve) {
    resolve("from a thenable");
  },
};
Promise.resolve(thenable).then((value) => console.log(value));

new Promise((resolve) => resolve(Promise.resolve("inner"))).then(() =>
  console.log("resolved with a promise"),
);
Promise.resolve()
  .then(() => console.log("tick 1"))
  .then(() => console.log("tick 2"))
  .then(() => console.log("tick 3"))
  .then(() => console.log("tick 4"));
