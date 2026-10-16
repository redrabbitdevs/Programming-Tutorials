try {
  try {
    JSON.parse("{nope");
  } catch (error) {
    throw new Error("could not load settings", { cause: error });
  }
} catch (error) {
  console.log(error.message);
  console.log(error.cause.name);
  console.log(error.cause instanceof SyntaxError);
}
