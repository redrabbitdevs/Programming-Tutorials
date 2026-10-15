import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const lines = rl[Symbol.asyncIterator]();

async function ask(prompt) {
  process.stdout.write(prompt);
  const { value } = await lines.next();
  return value;
}

const name = await ask("What is your name? ");
const year = Number(await ask("Which year were you born? "));
rl.close();

console.log(`Hello, ${name}!`);
console.log(`In 2030 you will be ${2030 - year}.`);
