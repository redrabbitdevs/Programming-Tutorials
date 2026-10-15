try {
  throw "just a string";
} catch (caught) {
  console.log(typeof caught, caught instanceof Error, caught.stack);
}

try {
  throw new Error("a real error");
} catch (caught) {
  console.log(typeof caught, caught instanceof Error, typeof caught.stack);
}
