import { isCorrect, summarise, verdict } from "./score.mjs";

const question = { prompt: "?", choices: ["a", "b"], answer: 1 };
console.log(isCorrect(question, 1), isCorrect(question, 0));

console.log(summarise([true, false, true, true]));
console.log(summarise([]));
console.log(verdict(100), verdict(50), verdict(0));
