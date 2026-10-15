import { createInterface } from "node:readline/promises";
import { askQuestion, parseChoice } from "./ask.mjs";

console.log(parseChoice("2", 4), parseChoice(" 4 ", 4), parseChoice("5", 4));
console.log(parseChoice("abc", 4), parseChoice("", 4), parseChoice("1.5", 4));

const rl = createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();

const question = { prompt: "Pick the second one", choices: ["a", "b", "c"], answer: 1 };
const picked = await askQuestion(lines, question, 1);
rl.close();

console.log(`\nYou picked index ${picked}`);
