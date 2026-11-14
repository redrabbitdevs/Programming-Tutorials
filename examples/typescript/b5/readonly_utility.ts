interface Config {
  host: string;
  port: number;
}

const config: Readonly<Config> = { host: "localhost", port: 80 };
config.port = 8080;

console.log(config);
