function readConfig(config) {
  return {
    host: config.server?.host ?? "localhost",
    port: config.server?.port ?? 8080,
    debug: config.debug ?? false,
  };
}

console.log(readConfig({}));
console.log(readConfig({ server: { port: 0 }, debug: false }));
console.log(readConfig({ server: { host: "example.test" }, debug: true }));
