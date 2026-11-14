type Config = { host: string; port?: number };

function address(config: Config): string {
  return `${config.host}:${config.port ?? 80}`;
}

console.log(address({ host: "example.org" }));
console.log(address({ host: "localhost", port: 0 }));
