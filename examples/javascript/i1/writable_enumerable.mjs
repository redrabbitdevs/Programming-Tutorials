const config = { name: "app" };
Object.defineProperty(config, "version", {
  value: "1.0",
  writable: false,
  enumerable: true,
});
Object.defineProperty(config, "token", {
  value: "abc123",
  enumerable: false,
});

try {
  config.version = "2.0";
} catch (error) {
  console.log(error.name, config.version);
}

console.log(Object.keys(config), JSON.stringify(config));
console.log({ ...config }, config.token, "token" in config);
console.log(Object.getOwnPropertyNames(config));
