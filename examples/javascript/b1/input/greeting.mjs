import { ask, closeInput } from "./prompt.mjs";

const name = await ask("What is your name? ");
closeInput();

console.log(`Hello, ${name}!`);
console.log(`Your name has ${name.length} letters.`);
