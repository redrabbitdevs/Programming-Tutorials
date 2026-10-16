Promise.resolve("start")
  .then((value) => {
    console.log("step 1 got", value);
    throw new Error("step 1 failed");
  })
  .then(() => console.log("step 2 (skipped)"))
  .catch((error) => {
    console.log("caught:", error.message);
    return "recovered";
  })
  .then((value) => console.log("step 3 got", value))
  .finally(() => console.log("finally runs last"));
