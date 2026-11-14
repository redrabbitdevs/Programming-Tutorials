try {
  JSON.parse("{");
} catch (error) {
  console.log(error.message);
}
