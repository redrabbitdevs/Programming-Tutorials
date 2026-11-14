type Id = string | number;
type Pair = [number, number];
type Handler = (message: string) => void;
type Level = "debug" | "info";

const id: Id = "A7";
const pair: Pair = [1, 2];
const handler: Handler = (message) => console.log(message);
const level: Level = "info";

handler(`${id} ${pair} ${level}`);
