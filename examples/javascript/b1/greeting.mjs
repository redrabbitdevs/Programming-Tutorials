import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const name = await rl.question("What is your name? ");
rl.close();

console.log(`Hello, ${name}!`);
console.log(`Your name has ${name.length} letters.`);
