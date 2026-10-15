function loadSettings(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("could not load settings", { cause: error });
  }
}

try {
  loadSettings("{nope");
} catch (error) {
  console.log(error.message);
  console.log(error.cause.name);
  console.log(error.cause instanceof SyntaxError);
}
