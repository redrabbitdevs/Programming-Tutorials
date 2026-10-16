import { ask, closeInput } from "./prompt.mjs";

const width = Number(await ask("Width? "));
const height = Number(await ask("Height? "));
closeInput();

console.log(`Area: ${width * height}`);
