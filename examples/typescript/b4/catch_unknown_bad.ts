try {
  JSON.parse("{oops");
} catch (error) {
  console.log(error.message);
}
