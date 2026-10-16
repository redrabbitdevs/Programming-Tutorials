const settings = {};

Object.defineProperties(settings, {
  host: { value: "localhost", enumerable: true },
  port: { value: 8080, enumerable: true },
  secret: { value: "s3cr3t" },
});

try {
  settings.port = 9090;
} catch (error) {
  console.log(error.name);
}

console.log(settings.port, Object.keys(settings));
console.log(JSON.stringify(settings), settings.secret);
