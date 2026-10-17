function loadConfig(env) {
  const port = Number(env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1) {
    throw new Error(`PORT must be a positive integer, got "${env.PORT}"`);
  }
  return { port, debug: env.DEBUG === "1", name: env.APP_NAME ?? "app" };
}

console.log(loadConfig({}));
console.log(loadConfig({ PORT: "8080", DEBUG: "1" }));
try {
  loadConfig({ PORT: "eighty" });
} catch (error) {
  console.log(error.message);
}
