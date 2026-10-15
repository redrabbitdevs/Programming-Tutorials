try {
  message = "hello";
  console.log("sloppy mode");
} catch (error) {
  console.log(`strict mode: ${error.name}`);
}
