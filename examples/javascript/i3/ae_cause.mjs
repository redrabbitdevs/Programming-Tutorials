function parseConfig(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("invalid config file", { cause: error });
  }
}

try {
  parseConfig("{port: 80}");
} catch (error) {
  console.log(error.message);
  console.log(error.cause.name);
  console.log(error.cause instanceof SyntaxError);
}
