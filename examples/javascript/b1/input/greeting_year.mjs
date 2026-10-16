import { ask, closeInput } from "./prompt.mjs";

const name = await ask("What is your name? ");
const year = Number(await ask("Which year were you born? "));
closeInput();

console.log(`Hello, ${name}!`);
console.log(`In 2030 you will be ${2030 - year}.`);
