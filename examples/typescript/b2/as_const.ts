const config = { host: "localhost", port: 8080 } as const;
const directions = ["north", "east"] as const;

const first: "south" = directions[0];
console.log(config.host, first);
