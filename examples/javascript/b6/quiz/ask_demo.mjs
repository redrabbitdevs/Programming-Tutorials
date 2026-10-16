import { parseChoice, showQuestion } from "./ask.mjs";

console.log(parseChoice("2", 4), parseChoice(" 4 ", 4), parseChoice("5", 4));
console.log(parseChoice("abc", 4), parseChoice("", 4), parseChoice("1.5", 4));

const question = {
  prompt: "Pick the second one",
  choices: ["a", "b", "c"],
  answer: 1,
};
showQuestion(question, 1);
console.log("(typed answer goes here)");
