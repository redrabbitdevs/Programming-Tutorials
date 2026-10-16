const config = { server: { port: 0 }, debug: false };

const settings = {
  host: config.server?.host ?? "localhost",
  port: config.server?.port ?? 8080,
  debug: config.debug ?? false,
};

console.log(settings);
